import * as middleware from './index';

describe('HATEOAS API Middleware', () => {
  it('shall export minimal information', () => {
    expect(typeof middleware.createAction).toEqual('function');
    expect(typeof middleware.nestActions).toEqual('function');
    expect(typeof middleware.default).toEqual('function');
    expect(typeof middleware.packTypes).toEqual('function');
  });
});
