from api import main


def test_hello():
    assert main.hello() == 'Hello API World!'
