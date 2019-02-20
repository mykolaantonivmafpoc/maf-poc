import authService from './authService';

describe('AuthService', () => {
  it('gets initial user state', () => {
    const { user } = authService;

    expect(user).toBeNull();
  });

  it('sets a user with the given params', () => {
    const user = {
      username: 'fakeUser',
      password: 'fakePass'
    };

    authService.setUser(user);
    expect(authService.getUser()).toEqual(user);
  });

  it('sets a user with username and password, but no authdata -- isLoggedIn() should return false', () => {
    const user = {
      username: 'fakeUser',
      password: 'fakePass'
    };

    authService.setUser(user);
    expect(authService.isLoggedIn()).toBe(false);
  });

  it('provides authdata as well --> isLoggedIn() should return true', () => {
    const user = {
      username: 'fakeUser',
      password: 'fakePass',
      authdata: 'fakeAuthData'
    };

    authService.setUser(user);
    expect(authService.isLoggedIn()).toBe(true);
  });
});
