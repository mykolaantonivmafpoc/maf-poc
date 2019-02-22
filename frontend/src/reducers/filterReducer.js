import SET_FILTER from '../constants/filterConstants';

export default (state = {}, action) => {
  let out = state;

  switch (action.type) {
    case SET_FILTER:
      out = action.payload;
      break;
    default:
      out = state;
      break;
  }
  return out;
};
