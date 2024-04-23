import React from 'react';
import { Navigate } from 'react-router-dom';

const ParentRouter = ({ user, children }) => {
  if (!user.isConnected) {
    return <Navigate to="/masuk/orangtua" replace />;
  } else {
    if (user.role !== 'parent') {
      return <Navigate to="/noaccess" replace />;
    }
  }
  return children;
};

export default ParentRouter;
