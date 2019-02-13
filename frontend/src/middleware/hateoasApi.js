import { normalize } from 'normalizr';
import RESTClient from '../services/RESTClient';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'HATEOAS_API_CALL';
export const packTypes = (requestType, successType, failureType) => (
  { requestType, successType, failureType }
);

const validateAction = (action) => {
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

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = async (endpoint, schema, verb) => {
  let out = null;
  const response = await RESTClient[verb](endpoint);
  if (response && response.error) {
    throw response;
  }
  const normalized = normalize(response, schema);
  out = Object.assign({},
    normalized,
  );
  return out;
};

const getHATEOEUrl = (endpoint, store) => {
  let out = endpoint;
  if (typeof endpoint === 'function') {
    out = endpoint(store);
  }

  if (typeof endpoint === 'object') {
    if (endpoint.key && endpoint.rel) {
      const { key, rel } = endpoint;
      const {
        entities: {
          links: {
            [key]: allLinks
          }
        }
      } = store;
      out = allLinks[rel];
    } else {
      throw new Error('The HATEOAS endpoint definition needs to be an object like { key, rel }');
    }
  }

  if (typeof out !== 'string') {
    throw new Error('Could not parse the Endpoint to a string value');
  }

  return out;
};

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const unwrappedAction = action[CALL_API];
  if (typeof unwrappedAction === 'undefined') {
    return next(action);
  }

  const { endpoint, schema, types } = validateAction(unwrappedAction);
  const url = getHATEOEUrl(endpoint, store.getState());

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const { requestType, successType, failureType } = types;
  next(actionWith({ type: requestType }));

  return callApi(url, schema, 'get').then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error || 'Something bad happened'
    }))
  );
};
