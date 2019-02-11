import { combineReducers } from 'redux';

const entities = (state = { users: {}, campaigns: {} }) => {
  return Object.assign({}, state);
};


const rootReducer = combineReducers({
  entities
});

export default rootReducer;
