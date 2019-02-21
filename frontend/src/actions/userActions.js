import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGOUT,
} from '../constants/userConstants';
import { mockedUsers } from '../config';

export const authenticate = (user) => async (dispatch) => {
  const action = { type: LOGIN_FAILURE, response: new Error('The login/password combination is not valid') };

  const foundUser = mockedUsers.find(item => {
    return (user.username === item.username && user.password === item.password);
  });

  if (foundUser !== undefined) {
    const mockUser = {
      ...foundUser,
      authdata: window.btoa(`${foundUser.username}:${foundUser.password}`)
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    action.type = LOGIN_SUCCESS;
    action.response = mockUser;
  }
  return dispatch(action);
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem('user');
  window.location.replace('/');
  return dispatch({ type: LOGOUT });
};
