import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect
} from 'react-router-dom';

import PrivateRoute from '../../components/Routing/PrivateRoute';

import Dashboard from '../Dashboard';
import Campaigns from '../Campaigns';
import Campaign from '../Campaign';
import Login from '../Login';

import optionsAction from '../../actions/HATEOASActions';

class Root extends Component {
  static propTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func,
      getState: PropTypes.func,
      replaceReducer: PropTypes.func,
      subscribe: PropTypes.func,
    }).isRequired,
  }

  componentWillMount() {
    const { store: { dispatch: d } } = this.props;
    optionsAction(d);
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <section>
          <Route
            exact
            path="/"
            render={() => (
              <Redirect to={{ pathname: '/campaigns' }}/>
            )}
          />
          <Route path="/login" component={Login} />

          <PrivateRoute path="/dashboard" component={Dashboard}/>
          <PrivateRoute path="/campaigns" component={Campaigns}/>
          <PrivateRoute path="/campaign/:id" component={Campaign}/>
        </section>
      </Provider>
    );
  }
}

export default Root;
