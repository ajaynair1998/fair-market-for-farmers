import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from '../../lib/auth';

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated() ? children : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
