import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGOUT,
} from '../constants/userConstants';

export const authenticate = (user) => async (dispatch) => {
  const mockedUser = {
    username: 'apiuser',
    password: 'apipass',
    firstName: 'John',
    lastName: 'Smith'
  };
  const action = { type: LOGIN_FAILURE, response: new Error('The login/password combination is not valid') };

  mockedUser.authdata = window.btoa(`${mockedUser.username}:${mockedUser.password}`);
  if (user.username === mockedUser.username && user.password === mockedUser.password) {
    localStorage.setItem('user', JSON.stringify(mockedUser));

    action.type = LOGIN_SUCCESS;
    action.response = mockedUser;
  }
  return dispatch(action);
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('user');
  window.location.replace('/');
  return dispatch({ type: LOGOUT });
};
