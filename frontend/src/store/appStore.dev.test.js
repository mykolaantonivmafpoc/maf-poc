import appStore from './appStore.dev';

describe('AppStore Development Config', () => {
  it('shall return a store', () => {
    const store = appStore();

    expect(store).toHaveProperty('dispatch');
    expect(store).toHaveProperty('getState');
    expect(store).toHaveProperty('replaceReducer');
    expect(store).toHaveProperty('subscribe');
  });
});
