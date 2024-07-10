import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthGuard = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return element;
};

AuthGuard.propTypes = {
  element: PropTypes.element.isRequired,
};

export default AuthGuard;