import middleware, { packTypes, CALL_API } from '.';
import { getHATEOEUrl } from './hateoasApi';
import RESTClient from '../../services/RESTClient';

describe('HATEOAS API Middleware main logic', () => {
  const state = {
    entities: {
      links: {
        abcKey: { abcRel: 'abc' }
      }
    }
  };

  const genericAction = { [CALL_API]: {
    types: packTypes('a', 'b', 'c'),
    endpoint: {
      key: 'abcKey',
      rel: 'abcRel'
    },
    schema: {}
  } };

  it('shell pass to the next middleware', () => {
    const store = { getState: jest.fn() };
    const next = jest.fn(data => data);
    const action = { myAction: {} };

    const result = middleware(store)(next)(action);

    expect(next).toHaveBeenCalled();
    expect(result).resolves.toEqual(action);
  });

  it('shall get state', () => {
    const store = { getState: jest.fn() };
    const action = { [CALL_API]: {
      types: packTypes('a', 'b', 'c'),
      endpoint: '',
      schema: {}
    } };
    const next = jest.fn(data => data);

    middleware(store)(next)(action);
    expect(store.getState).toHaveBeenCalled();
  });

  it('shall parse the endpont correctly', () => {
    const endpointHandler = jest.fn(instore => JSON.stringify(instore));
    getHATEOEUrl(endpointHandler, state);
    expect(endpointHandler).toHaveBeenCalled();

    expect(() => getHATEOEUrl({ rel: 'abcRel' }, state)).toThrow();
    expect(() => getHATEOEUrl(() => 1, state)).toThrow();
  });

  it('shall call the RESTApi through', () => {
    const spyRESTClientGet = jest.spyOn(RESTClient, 'get');
    const store = { getState: jest.fn(() => state) };
    const next = jest.fn(data => data);

    middleware(store)(next)(genericAction);
    expect(spyRESTClientGet).toHaveBeenCalled();
    spyRESTClientGet.mockRestore();
  });
});
