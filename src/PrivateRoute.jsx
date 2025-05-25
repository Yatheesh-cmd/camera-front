import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { authContext } from './context/ContextApi';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { auth } = useContext(authContext);

  return auth ? Component : <Navigate to="/login" replace />;
};

export default PrivateRoute;