import os
import json
import logging
from flask import Flask
from flask import jsonify
from flask import url_for as _url_for
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_monitor import Monitor, ObserverLog
from flask_swagger_ui import get_swaggerui_blueprint
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin
from flask_basicauth import BasicAuth as OldBasicAuth


def url_for(endpoint, **values):
    # fix querystring dicts
    querystring_dicts = []
    for key, value in list(values.items()):
        if isinstance(value, dict):
            for _key, _value in list(value.items()):
                querystring_dicts.append('%s[%s]=%s' % (key, _key, _value))
            values.pop(key)

    # create url
    url = _url_for(endpoint, **values)

    # append querystring dicts
    if querystring_dicts:
        seperator = '?'
        if '?' in url:
            seperator = '&'
        url = '%s%s%s' % (url, seperator, '&'.join(querystring_dicts))

    return url


# swagger settings
SWAGGER_URL = '/v1/docs'  # the docs will be at /v1/docs/
API_URL = '/v1/swagger.json'

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={  # Swagger UI config overrides
        'app_name': 'MAF POC API'
    },
)


class myeventlog(ObserverLog):

    def __init__(self):
        ObserverLog.__init__(self, filter=self.filter)

    def action(self, event):
        logging.getLogger().error(event.json)

    def filter(self, event):
        return event.response.status_code != 400


app = Flask(__name__)

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = \
    os.getenv('SQLALCHEMY_DATABASE_URI', default='sqlite:///:memory:')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
if app.debug:
    app.config['SQLALCHEMY_ECHO'] = True


stub_auth_list = {
    'apiuser': {
        'password': 'apipass',
        'acl': {
            '/': ['GET', 'OPTIONS'],
            '/v1/campaigns/': ['GET', 'OPTIONS'],
            '/v1/campaigns/<int:id>/': ['GET', 'OPTIONS'],
        }
    },
    'adminUser': {
        'password': 'apipass',
        'acl': {
            '/': ['GET', 'OPTIONS'],
            '/v1/campaigns/': ['GET', 'POST', 'OPTIONS'],
            '/v1/campaigns/<int:id>/': ['GET', 'PUT', 'DELETE', 'OPTIONS'],
        }
    },
}

current_user = {}


class BasicAuth(OldBasicAuth):

    def check_credentials(self, username, password):

        if username in stub_auth_list:
            user = stub_auth_list[username]

            if password == user['password']:
                rule = request.url_rule.rule

                if rule in user['acl']:
                    if request.method in user['acl'][rule]:

                        current_user['object'] = user
                        current_user['path_methods'] = user['acl'][rule]

                        return True


@app.after_request
def after_request(response):
    # TODO: limit CORS to real domain names
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Allow', 'OPTIONS,GET,HEAD,POST,PUT,DELETE')
    response.headers.add(
        'Access-Control-Allow-Methods',
        'OPTIONS,GET,HEAD,POST,PUT,DELETE')
    response.headers.add('Version', '1.0.0')

    response.headers.add(
        'Access-Control-Allow-Headers',
        'Content-Type,Authorization')
    return response


# Define the database object which is imported by modules and controllers,
# set up Monitor, Swagger and Marshmellow
db = SQLAlchemy(app)
ma = Marshmallow(app)
basic_auth = BasicAuth(app)
monitor = Monitor('monitor', __name__)
app.register_blueprint(monitor)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)
monitor.add_observer(myeventlog())


spec = APISpec(
    title="Campaing kpi metrics REST API",
    version="1.0.0",
    openapi_version="3.0.2",
    plugins=[FlaskPlugin(), MarshmallowPlugin()],
)


# import all controllers
from .controller import campaign # NOQA
@app.route('/', methods=['GET'])
@basic_auth.required
def listVersion():
    return jsonify({'Campaigns': url_for('listCampaign')})


# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    db.session.rollback()
    return json.dumps({
        "errors": [
            {
                "status": 404,
                "source": {"pointer": request.path},
                "title": "The desired resource cannot be found",
                "detail": ""
            }
        ]
    }), 404


@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return json.dumps({
        "errors": [
            {
                "status": 500,
                "source": {"pointer": request.path},
                "title": "Internal server error",
                "detail": ""
            }
        ]
    }), 500


@app.route('/v1/swagger.json')
def api_detail():
    return json.dumps(spec.to_dict(), indent=2)
