import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest }) =>
  <Route {...rest} render={props => <Component {...props} />} />;

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  route: PropTypes.string.isRequired
};

export default PrivateRoute;
