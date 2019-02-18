import * as userActions from './userActions';
import * as constants from '../constants/userConstants';

const dispatch = jest.fn(input => input);

describe('authenticate actions', () => {
  it('should authenticate the user successfully', () => {
    const user = {
      username: 'apiuser',
      password: 'apipass'
    };
    const func = userActions.authenticate(user);
    const action = func(dispatch);

    expect(action.type).toEqual(constants.LOGIN_SUCCESS);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should return login failure', () => {
    const user = {
      username: '',
      password: ''
    };
    const func = userActions.authenticate(user);
    const action = func(dispatch);
    const expectedLoginAction = {
      type: constants.LOGIN_FAILURE
    };

    expect(action).toEqual(expectedLoginAction);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('logout action', () => {
  it('should call dispatch successfully with the correct action type', () => {
    const func = userActions.logout();
    const action = func(dispatch);

    expect(action.type).toEqual(constants.LOGOUT);
    expect(dispatch).toHaveBeenCalled();
  });
});
