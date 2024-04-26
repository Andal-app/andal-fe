import React from 'react';
import { Navigate } from 'react-router-dom';

// route hanya untuk user yang isConnected == true
// dapat diakses oleh parent dan child

const PrivateRouter = ({ user, children }) => {
  if (!user.isConnected) {
    return <Navigate to="/" replace />;
  } else {
    if (user.role !== 'parent' && user.role !== 'child') {
      // return <Navigate to="/noaccess" replace />;
      return <Navigate to="/" replace />;
    }
  }
  return children;
};

export default PrivateRouter;
