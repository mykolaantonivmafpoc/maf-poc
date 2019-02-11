import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect
} from 'react-router-dom';

// import AuthService from '../services/authService';
import Dashboard from '../Dashboard';
import Campaigns from '../Campaigns';
import Login from '../Login';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <section>
        <Route
          exact
          path="/"
          render={() => (
            <Redirect to={{ pathname: '/dashboard' }}/>
          )}
        />
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/campaigns" component={Campaigns}/>
        <Route path="/login" component={Login} />
      </section>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func,
    getState: PropTypes.func,
    replaceReducer: PropTypes.func,
    subscribe: PropTypes.func,
  }).isRequired,
};
export default Root;
