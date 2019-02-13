import merge from 'lodash/merge';
import { combineReducers } from 'redux';

const entities = (state = { users: {}, campaigns: {}, links: {} }, action) => {
  let out = Object.assign({}, state);
  if (action.response && action.response.entities) {
    out = merge({}, state, action.response.entities);
  }

  return out;
};


const rootReducer = combineReducers({
  entities
});

export default rootReducer;
