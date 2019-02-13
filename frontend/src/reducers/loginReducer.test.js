import login from './loginReducer';
import * as constants from '../constants/userConstants';
import authService from '../services/authService';

describe('login reducer', () => {
  let authSpy;

  beforeAll(() => {
    authSpy = jest.spyOn(authService, 'setUser');
  });

  it('should return the initial state', () => {
    expect(login(undefined, {})).toBeNull();
  });

  it('should handle LOGIN_SUCCESS', () => {
    const action = {
      type: constants.LOGIN_SUCCESS,
      response: 'Correct behaviour'
    };

    expect(login({}, action)).toEqual('Correct behaviour');
    expect(authSpy).toHaveBeenCalled();
  });

  it('should handle LOGIN_FAILURE', () => {
    const user = {
      username: 'wronguser',
      password: 'apipass'
    };

    expect(login(user, { type: constants.LOGIN_FAILURE })).toBeNull();
    expect(authSpy).toHaveBeenCalled();
  });
});
