import React from 'react';
import { Navigate } from 'react-router-dom';

// route hanya untuk user yang isConnected == true & role == child

const ChildRouter = ({ user, children }) => {
  if (!user.isConnected) {
    return <Navigate to="/masuk/anak" replace />;
  } else {
    if (user.role !== 'child') {
      // return <Navigate to="/noaccess" replace />;
      return <Navigate to="/" replace />;
    }
  }
  return children; // masuk ke route children
};

export default ChildRouter;
