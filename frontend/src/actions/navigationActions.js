import { SHOW_FILTER, HIDE_FILTER, SHOW_MAIN_NAV, HIDE_MAIN_NAV, REMOVE_MAIN_NAV } from '../constants/navigationConstants';

export const showFitler = () => (dispatch) => {
  return dispatch({ type: SHOW_FILTER });
};

export const hideFilter = () => (dispatch) => {
  return dispatch({ type: HIDE_FILTER });
};

export const showMainNav = () => (dispatch) => {
  return dispatch({ type: SHOW_MAIN_NAV });
};

export const hideMainNav = () => (dispatch) => {
  return dispatch({ type: HIDE_MAIN_NAV });
};

export const removeMainNav = () => (dispatch) => {
  return dispatch({ type: REMOVE_MAIN_NAV });
};
