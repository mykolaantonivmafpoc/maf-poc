describe('AppStore Production Config', () => {
  beforeEach(() => {
    jest.resetModules();

    jest.mock('./appStore.dev');
    jest.mock('./appStore.prod');
  });

  it('shall instantiate dev store', () => {
    const devStore = require('./appStore.dev'); // eslint-disable-line global-require
    const prodStore = require('./appStore.prod'); // eslint-disable-line global-require

    process.env.NODE_ENV = 'development';
    const appStore = require('./configureStore'); // eslint-disable-line global-require
    appStore.default();

    expect(devStore.default).toHaveBeenCalled();
    expect(prodStore.default).not.toHaveBeenCalled();
  });

  it('shall instantiate prod store', () => {
    const devStore = require('./appStore.dev'); // eslint-disable-line global-require
    const prodStore = require('./appStore.prod'); // eslint-disable-line global-require

    process.env.NODE_ENV = 'production';
    const appStore = require('./configureStore'); // eslint-disable-line global-require
    appStore.default();

    expect(devStore.default).not.toHaveBeenCalled();
    expect(prodStore.default).toHaveBeenCalled();
  });
});
