import { merge } from 'lodash';

const entities = (state = { campaigns: {}, links: {} }, action) => {
  let out = Object.assign({}, state);
  if (action.response && action.response.entities) {
    out = merge({}, state, action.response.entities);
  }
  return out;
};
export default entities;
