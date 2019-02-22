import SET_FILTER from '../constants/filterConstants';

export default payload => dispatch => {
  return dispatch({ type: SET_FILTER, payload });
};
