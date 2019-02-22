import nestActions from './nestActions';

describe('HATEOAS API Middleware nestActions', () => {
  it('shall curry a function', () => {
    expect(typeof nestActions(jest.fn(), jest.fn())).toEqual('function');
  });
});
