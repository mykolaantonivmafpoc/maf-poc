import { CALL_API } from './index';

export const getStoreVals = (storage, path) => {
  return path.split('.').reduce((accum, item) => {
    return accum[item] || {};
  }, storage);
};

export const validateAction = (action) => {
  const { endpoint, schema, types } = action;
  if (['object', 'function', 'string'].indexOf(typeof endpoint) === -1) {
    throw new Error(`Expected "endpoint" to be of type "object", "function" or "string", but found ${typeof endpoint}`);
  }
  if (typeof types !== 'object') {
    throw new Error('Expected "types" to be an Object of action three types like { requestType, successType, failureType }.');
  }
  const typesArr = Object.values(types);
  if (typesArr.length !== 3) {
    throw new Error('Expected three action types like { requestType, successType, failureType }.');
  }
  typesArr.map(type => {
    const t = typeof type;
    if (t !== 'string') {
      throw new Error(`Expected the action type "${type}" to be a string, but found ${t}`);
    }
    return true;
  });
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }
  return action;
};

export const packTypes = (requestType, successType, failureType) => (
  { requestType, successType, failureType }
);

export const curryActionWith = (orgAction) => (data) => {
  const finalAction = { ...orgAction, ...data };
  delete finalAction[CALL_API];
  return finalAction;
};
