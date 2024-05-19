import React from 'react';
import { Navigate } from 'react-router-dom';

// route hanya untuk user yang isConnected == true & role == parent

const ParentRouter = ({ user, children }) => {
  if (!user.isConnected) {
    return <Navigate to="/masuk/orangtua" replace />;
  } else {
    if (user.role !== 'parent') {
      // return <Navigate to="/noaccess" replace />;
      return <Navigate to="/" replace />;
    }
  }
  return children; // masuk ke route children
};

export default ParentRouter;
