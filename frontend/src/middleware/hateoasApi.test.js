import middleware, { packTypes, CALL_API } from './hateoasApi';
import RESTClient from '../services/RESTClient';


describe('HATEOAS API Middleware', () => {
  it('packs the types correctly', () => {
    const types = packTypes('a', 'b', 'c');
    expect(types).toEqual({ requestType: 'a', successType: 'b', failureType: 'c' });
  });

  it('shell pass to the next middleware', () => {
    const store = { getState: jest.fn() };
    const next = jest.fn(data => data);
    const action = { myAction: {} };

    const result = middleware(store)(next)(action);

    expect(next).toHaveBeenCalled();
    expect(result).toEqual(action);
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
  it('shall validate the input action', () => {
    const store = { getState: jest.fn() };
    const action = { [CALL_API]: {
      endpoint: '',
      schema: {}
    } };
    const next = jest.fn(data => data);

    expect(() => { middleware(store)(next)(action); }).toThrow();

    action[CALL_API].types = packTypes('a', 1, 'c');
    expect(() => { middleware(store)(next)(action); }).toThrow();

    action[CALL_API].types = '';
    expect(() => { middleware(store)(next)(action); }).toThrow();

    action[CALL_API].types = { a: 'a', b: 'b', c: 'c', s: 's' };
    expect(() => { middleware(store)(next)(action); }).toThrow();

    action[CALL_API].types = packTypes('a', 'b', 'c');
    action[CALL_API].endpoint = null;
    expect(() => { middleware(store)(next)(action); }).toThrow();

    action[CALL_API].endpoint = undefined;
    expect(() => { middleware(store)(next)(action); }).toThrow();

    action[CALL_API].schema = undefined;
    expect(() => { middleware(store)(next)(action); }).toThrow();
  });

  it('shall parse the endpont correctly', () => {
    const spyRESTClientGet = jest.spyOn(RESTClient, 'get');
    const state = {
      entities: {
        links: {
          abcKey: { abcRel: 'abc' }
        }
      }
    };

    const store = { getState: jest.fn(() => state) };
    const endpointHandler = jest.fn(instore => JSON.stringify(instore));

    const action = { [CALL_API]: {
      types: packTypes('a', 'b', 'c'),
      endpoint: endpointHandler,
      schema: {}
    } };
    const next = jest.fn(data => data);

    middleware(store)(next)(action);
    expect(endpointHandler).toHaveBeenCalled();

    action[CALL_API].endpoint = {
      key: 'abcKey',
      rel: 'abcRel'
    };
    middleware(store)(next)(action);
    expect(spyRESTClientGet).toHaveBeenCalledWith('abc');
    spyRESTClientGet.mockRestore();

    action[CALL_API].endpoint = {
      rel: 'abcRel'
    };
    expect(() => { middleware(store)(next)(action); }).toThrow();

    action[CALL_API].endpoint = () => 1;
    expect(() => { middleware(store)(next)(action); }).toThrow();
  });
});
