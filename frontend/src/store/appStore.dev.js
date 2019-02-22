import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension'; // eslint-disable-line import/no-extraneous-dependencies
import rootReducer from '../reducers/rootReducer';
import HATEOASApi from '../middleware/HATEOASApi';

const initialState = {
  // to append initial state
};

const composeEnhancers = composeWithDevTools;

const appStore = () => {
  const combinedInitialState = {
    ...initialState
  };

  return createStore(
    rootReducer,
    combinedInitialState,
    composeEnhancers(
      applyMiddleware(thunk, HATEOASApi)
    )
  );
};

export default appStore;
