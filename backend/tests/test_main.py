import sys
from flask_testing import TestCase
from werkzeug.test import Client
from werkzeug.datastructures import Headers
sys.path.append("..")
from app.app import app, db # NOQA

app.config['SQLALCHEMY_DATABASE_URI'] = \
    'postgresql+psycopg2://postgres:dbpassword@postgres:5432/postgres'


class AuthTest(TestCase):

    def create_app(self):
        return app

    def test_campaign_page_rejects_bad_password(self):
        h = Headers()
        h.add('Authorization',
              'Basic YXBpdXNlcmFzZGFzZDphcGlwYXNz')
        rv = Client.open(self.client, path='/v1/campaigns/',
                         headers=h)
        self.assert_401(rv)

    def test_single_campaign_page_rejects_bad_password(self):
        h = Headers()
        h.add('Authorization',
              'Basic YXBpdXNlcmFzZGFzZDphcGlwYXNz')
        rv = Client.open(self.client, path='/v1/campaigns/1/',
                         headers=h)
        self.assert_401(rv)
