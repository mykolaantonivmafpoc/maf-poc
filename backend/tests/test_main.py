import pytest


BAD_PASSWORD = 'Basic YXBpdXNlcmFzZGFzZDphcGlwYXNz'
USER_PASSWORD = 'Basic YXBpdXNlcjphcGlwYXNz'
ADMIN_PASSWORD = 'Basic YWRtaW5Vc2VyOmFwaXBhc3M='


@pytest.mark.parametrize(('path', 'password', 'method', 'result'), (
    ('/', BAD_PASSWORD, 'GET', 401),
    ('/v1/campaigns/', BAD_PASSWORD, 'GET', 401),
    ('/v1/campaigns/1/', BAD_PASSWORD, 'GET', 401),
    ('/v1/campaigns/', USER_PASSWORD, 'POST', 405),
    ('/v1/campaigns/1/', USER_PASSWORD, 'PUT', 405),
    ('/', USER_PASSWORD, 'GET', 200),
    ('/', USER_PASSWORD, 'OPTIONS', 200),
    ('/v1/campaigns/', ADMIN_PASSWORD, 'POST', 405),
    ('/v1/campaigns/1/', ADMIN_PASSWORD, 'PUT', 405),
))
def test_api_authentication(client, path, password, method, result):
    rv = client.open(
        path=path,
        headers=[('Authorization', password)],
        method=method
    )
    print(rv)
    assert rv.status_code == result
