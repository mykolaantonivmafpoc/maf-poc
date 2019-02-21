import appStore from './appStore.prod';

describe('AppStore Production Config', () => {
  it('shall return a store', () => {
    const store = appStore();

    expect(store).toHaveProperty('dispatch');
    expect(store).toHaveProperty('getState');
    expect(store).toHaveProperty('replaceReducer');
    expect(store).toHaveProperty('subscribe');
  });
});
