import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect
} from 'react-router-dom';

import PrivateRoute from '../../components/Routing/PrivateRoute';

import Campaigns from '../Campaigns';
import Campaign from '../Campaign';
import Login from '../Login';

import optionsAction from '../../actions/HATEOASActions';
import { routeByName } from '../../config';

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
  }
}

export default Root;
