import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import PropTypes from 'prop-types';
import authService from '../../../services/authService';

const PrivateRoute = ({ component: Component, render: Render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        (authService.isLoggedIn()) ? (
          (Component && <Component {...props} />)
          || (Render && Render(rest))
          || null
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      )}
    />
  );
};
PrivateRoute.propTypes = {
  component: PropTypes.func,
  render: PropTypes.func,
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({})
  ])
};
PrivateRoute.defaultProps = {
  component: null,
  render: null,
  location: null
};

export default PrivateRoute;
