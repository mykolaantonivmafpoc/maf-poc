import { SHOW_FILTER, HIDE_FILTER, SHOW_MAIN_NAV, HIDE_MAIN_NAV, REMOVE_MAIN_NAV } from '../constants/navigationConstants';

export default (state = { filterShown: true, navShown: undefined }, action) => {
  let out = state;
  switch (action.type) {
    case SHOW_FILTER:
      out = Object.assign({}, state, { filterShown: true });
      break;
    case HIDE_FILTER:
      out = Object.assign({}, state, { filterShown: false });
      break;
    case SHOW_MAIN_NAV:
      out = Object.assign({}, state, { navShown: true });
      break;
    case HIDE_MAIN_NAV:
      out = Object.assign({}, state, { navShown: undefined });
      break;
    case REMOVE_MAIN_NAV:
      out = Object.assign({}, state, { navShown: false });
      break;
    default:
      out = state;
      break;
  }
  return out;
};
