import genericReducer from './genericReducer';

const curryReducers = ({ key, types }) => {
  return (state = {}, action) => {
    const [requestType, successType, failureType] = types;
    const act = { ...action, key, types };

    // Update pagination by key
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
        // const key = mapActionToKey(action)
        if (typeof key !== 'string') {
          throw new Error('Expected key to be a string.');
        }
        return {
          ...state,
          ...genericReducer(state, act)
        };
      default:
        return state;
    }
  };
};

export default curryReducers;
