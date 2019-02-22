import { normalize } from 'normalizr';
import RESTClient from '../../services/RESTClient';
import { LINKS } from '../../constants/HATEOASConstants';
import { validateAction, getStoreVals, curryActionWith } from './utils';
import { CALL_API } from './index';

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export const callApi = async (endpoint, schema, verb, filter) => {
  let out = null;
  const response = await RESTClient[verb](endpoint, undefined, filter);
  if (response && response.error) {
    throw response;
  }
  let resp = response;
  if (typeof response === 'string') {
    resp = JSON.parse(response);
  }

  if (!resp[LINKS]) {
    out = {
      entities: { links: resp },
      result: { [LINKS]: Object.keys(resp) }
    };
  } else {
    const normalized = normalize(resp, schema);
    out = { ...normalized };
  }
  return out;
};

export const getHATEOEUrl = (endpoint, store) => {
  let out = endpoint;
  if (typeof endpoint === 'function') {
    out = endpoint(store);
  }

  if (typeof endpoint === 'object') {
    if (endpoint.key) {
      const { key, rel } = endpoint;

      const {
        entities: {
          links: {
            [key]: linksStore
          }
        }
      } = store;
      out = (rel && linksStore && linksStore[rel]) || linksStore;
    } else {
      throw new Error('The HATEOAS endpoint definition needs to be an object like { key, rel }');
    }
  }

  if (typeof out !== 'string') {
    throw new Error('Could not parse the Endpoint to a string value');
  }

  return out;
};

export const curryHandleAction = (store, next, orgAction) => async (unwrappedAction) => {
  const { endpoint, schema, types, filter } = validateAction(unwrappedAction);
  const url = getHATEOEUrl(endpoint, store.getState());
  const actionWith = curryActionWith(orgAction);

  const { requestType, successType, failureType } = types;
  next(actionWith({ type: requestType }));

  try {
    const response = await callApi(url, schema, 'get', filter);
    return next(actionWith({
      response,
      type: successType
    }));
  } catch (error) {
    return next(actionWith({
      type: failureType,
      error: error || 'Something bad happened'
    }));
  }
};

// A HATEOAS Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => async action => {
  let out;
  const unwrapped = action[CALL_API];
  const handleAction = curryHandleAction(store, next, action);

  if (typeof unwrapped === 'undefined') {
    out = next(action);
  } else if (unwrapped instanceof Array) {
    unwrapped.reduce(async (accum, item, idx, arr) => {
      const { schema } = item;
      // try to find the url in the store or request it
      let output;
      if (accum instanceof Promise) { await accum; }
      try {
        const storeData = getStoreVals(store.getState(), schema.storePath);
        if (storeData.isFetching === false && storeData[LINKS] && idx !== arr.length - 1) {
          output = storeData;
        } else {
          const act = { ...item };
          output = handleAction(act);
        }
      } catch (e) {
        return handleAction(item);
      }
      return output;
    }, null);
  } else {
    out = handleAction(unwrapped);
  }
  return out;
};
