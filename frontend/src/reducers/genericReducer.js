
const genericReducer = (state = {}, action) => {
  const [requestType, successType, failureType] = action.types;
  switch (action.type) {
    case requestType:
      return {
        isFetching: true
      };
    case successType:
      return {
        ...state,
        isFetching: false,
        ...action.response.result
      };
    case failureType:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default genericReducer;
