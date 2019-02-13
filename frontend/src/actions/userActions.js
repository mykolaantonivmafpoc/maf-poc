import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGOUT,
} from '../constants/userConstants';

export const authenticate = (user) => (dispatch) => {
  const mockedUser = {
    username: 'apiuser',
    password: 'apipass',
    firstName: 'John',
    lastName: 'Smith'
  };
  const action = { type: LOGIN_FAILURE };

  mockedUser.authdata = window.btoa(`${mockedUser.username}:${mockedUser.password}`);
  if (user.username === mockedUser.username && user.password === mockedUser.password) {
    localStorage.setItem('user', JSON.stringify(mockedUser));

    action.type = LOGIN_SUCCESS;
    action.response = mockedUser;
  }
  return dispatch(action);
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('user');
  return dispatch({ type: LOGOUT });
};
