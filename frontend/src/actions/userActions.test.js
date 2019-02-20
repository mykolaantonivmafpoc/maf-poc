import * as userActions from './userActions';
import * as constants from '../constants/userConstants';

const dispatch = jest.fn(input => input);

describe('authenticate actions', () => {
  it('should authenticate the user successfully', async () => {
    const user = {
      username: 'apiuser',
      password: 'apipass'
    };
    const func = await userActions.authenticate(user);
    const action = await func(dispatch);

    expect(action.type).toEqual(constants.LOGIN_SUCCESS);
    expect(dispatch).toHaveBeenCalled();
  });

  it('should return login failure', async () => {
    const user = {
      username: '',
      password: ''
    };
    const func = await userActions.authenticate(user);
    const action = await func(dispatch);

    expect(action.type).toEqual(constants.LOGIN_FAILURE);
    expect(dispatch).toHaveBeenCalled();
  });
});

describe('logout action', () => {
  it('should call dispatch successfully with the correct action type', async () => {
    const func = await userActions.logout();
    const action = await func(dispatch);

    expect(action.type).toEqual(constants.LOGOUT);
    expect(dispatch).toHaveBeenCalled();
  });
});
