import { getStoreVals, packTypes, validateAction, curryActionWith } from './utils';
import { CALL_API } from './index';

describe('HATEOAS API Middleware Utils', () => {
  it('packs the types correctly', () => {
    const types = packTypes('a', 'b', 'c');
    expect(types).toEqual({ requestType: 'a', successType: 'b', failureType: 'c' });
  });

  it('shall validate the input action', () => {
    const action = {
      endpoint: '',
      schema: {}
    };

    expect(() => validateAction(action)).toThrow();

    action.types = packTypes('a', 1, 'c');
    expect(() => validateAction(action)).toThrow();

    action.types = '';
    expect(() => validateAction(action)).toThrow();

    action.types = { a: 'a', b: 'b', c: 'c', s: 's' };
    expect(() => validateAction(action)).toThrow();

    action.types = packTypes('a', 'b', 'c');
    action.endpoint = undefined;
    expect(() => validateAction(action)).toThrow();

    action.endpoint = undefined;
    expect(() => validateAction(action)).toThrow();

    action.schema = undefined;
    expect(() => validateAction(action)).toThrow();
  });

  it('shall get the store values properly', () => {
    const storage = {
      a: { b: { c: 1 } }
    };

    expect(getStoreVals(storage, 'a.b.c')).toEqual(1);
  });

  it('shall curry the actions properly', () => {
    const orgAction = { [CALL_API]: { type: 'abc', endpoint: 'abc' } };
    const data = { type: 'xyz', payload: 'xyz' };
    const actionWith = curryActionWith(orgAction);
    const exec = actionWith(data);

    expect(typeof actionWith).toEqual('function');
    expect(exec).toEqual(data);
    expect(exec).not.toHaveProperty(CALL_API);
  });
});
