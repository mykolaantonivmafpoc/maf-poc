import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGOUT
} from '../constants/userConstants';
import authService from '../services/authService';

export default (state = JSON.parse(localStorage.getItem('user')), action) => {
  let out = state;
  switch (action.type) {
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
      out = action.response;
      break;
    case LOGOUT:
      out = null;
      break;
    default:
      out = state;
      break;
  }

  authService.setUser(out);
  return out;
};
