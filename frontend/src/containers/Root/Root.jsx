import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import PrivateRoute from '../../components/Routing/PrivateRoute';

import Campaigns from '../Campaigns';
import Campaign from '../Campaign';
import Login from '../Login';

import { routeByName } from '../../config';

const Root = ({ store }) => (
  <Provider store={store}>
    <section className="root">
      <Route
        exact
        path="/"
        render={() => (
          <Redirect to={{ pathname: routeByName('campaigns').path }}/>
        )}
      />
      <Route path="/login" component={Login} />

      <PrivateRoute {...routeByName('campaigns')} component={Campaigns}/>
      <PrivateRoute {...routeByName('campaign')} component={Campaign}/>
    </section>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({
    dispatch: PropTypes.func,
    getState: PropTypes.func,
    replaceReducer: PropTypes.func,
    subscribe: PropTypes.func,
  }).isRequired,
};

export default Root;
