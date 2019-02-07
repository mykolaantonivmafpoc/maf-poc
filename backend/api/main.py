from flask import Flask


app = Flask(__name__)


def hello():
    return 'Hello API World!'


@app.route('/')
def root():
    return hello()
