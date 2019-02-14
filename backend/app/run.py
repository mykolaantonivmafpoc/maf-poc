# Run a test server.
from .app import app
import os
import logging


def run():
    app.logger.setLevel(logging.INFO)
    app.run(
        host=os.getenv('HOST_IP', default='0.0.0.0'),
        port=os.getenv('API_PORT', default=8080)
    )
