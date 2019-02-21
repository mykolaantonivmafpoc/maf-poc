import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/rootReducer';
import HATEOASApi from '../middleware/hateoasApi';

const initialState = {
  // to append initial state
};

const composeEnhancers = compose;

const appStore = () => {
  const combinedInitialState = {
    ...initialState,
  };

  return createStore(
    rootReducer,
    combinedInitialState,
    composeEnhancers(
      applyMiddleware(thunk, HATEOASApi, createLogger())
    )
  );
};

export default appStore;
