import createAction from './createAction';
import { CALL_API } from './index';

describe('HATEOAS API Middleware createAction', () => {
  it('shall return an object', () => {
    const endpoint = 'a';
    const schema = {};
    const payload = 'payload';
    const action = createAction({ endpoint, schema, payload });
    expect(action).toHaveProperty(CALL_API);
    expect(action[CALL_API].endpoint).toEqual(endpoint);
    expect(action[CALL_API].schema).toEqual(schema);
    expect(action[CALL_API].payload).toEqual(payload);
  });
});
