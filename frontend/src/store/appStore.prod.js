import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/roodReducer';

const initialState = {
  // to append initial state
};

const composeEnhancers = compose;

const appStore = () => {
  const combinedInitialState = {
    ...initialState,
    // more states to come?
  };

  return createStore(
    rootReducer,
    combinedInitialState,
    composeEnhancers(
      applyMiddleware(thunk, createLogger())
    )
  );
};

export default appStore;
