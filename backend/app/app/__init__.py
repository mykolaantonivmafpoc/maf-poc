import string, random, json, os, decimal # NOQA
from datetime import datetime as dt # NOQA
from flask import Flask, jsonify, g, url_for as _url_for # NOQA
from flask import request, Blueprint # NOQA
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import PrimaryKeyConstraint # NOQA
from sqlalchemy.sql import func # NOQA
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_monitor import Monitor, ObserverLog
from flask_swagger_ui import get_swaggerui_blueprint
from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from apispec_webframeworks.flask import FlaskPlugin
from flask_basicauth import BasicAuth
import logging


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


# will force BASIC_AUTH_FORCE in the config
# swagger settings
SWAGGER_URL = '/v1/docs'  # the docs will be at /v1/docs/dist/
API_URL = '/v1/swagger.json'

swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={  # Swagger UI config overrides
        'app_name': "Test API"
    },
    # oauth_config={
    #    'clientId': "your-client-id",
    #    'clientSecret': "your-client-secret-if-required",
    #    'realm': "your-realms",
    #    'appName': "your-app-name",
    #    'scopeSeparator': " ",
    #    'additionalQueryStringParams': {'test': "hello"}
    # }
)


class myeventlog(ObserverLog):

    def __init__(self):
        ObserverLog.__init__(self, filter=self.filter)

    def action(self, event):
        logging.getLogger().error(event.json)

    def filter(self, event):
        return event.response.status_code != 400


# api = Blueprint('api', 'api', url_prefix='/v1/api')
app = Flask(__name__)

# Configurations
app.config['SQLALCHEMY_DATABASE_URI'] = \
    os.getenv('SQLALCHEMY_DATABASE_URI', default='sqlite:////tmp/test.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
if app.debug:
    app.config['SQLALCHEMY_ECHO'] = True

app.config['BASIC_AUTH_USERNAME'] = \
    os.getenv('BASIC_AUTH_USERNAME', default='apiuser')

app.config['BASIC_AUTH_PASSWORD'] = \
    os.getenv('BASIC_AUTH_PASSWORD', default='apipass')

cors = CORS(
    app,
    resources={r"/v1/*": {
        "origins": os.getenv('CORS_ORIGINS', default="*")
    }}
)


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')

    response.headers.add(
        'Access-Control-Allow-Headers',
        'Content-Type,Authorization')

    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)
ma = Marshmallow(app)
basic_auth = BasicAuth(app)
# @basic_auth.required
monitor = Monitor('monitor', __name__)
app.register_blueprint(monitor)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)
# app.register_blueprint(api)
monitor.add_observer(myeventlog())


spec = APISpec(
    title="Campaing kpi metrics REST API",
    version="1.0.0",
    openapi_version="3.0.2",
    plugins=[FlaskPlugin(), MarshmallowPlugin()],
)


# import all controllers
from .controller import campaign # NOQA
@app.route('/v1', methods=['GET'])
@basic_auth.required
def listVersion():
    return json.dumps({"Campaigns": url_for('listCampaign')})


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
