import React from 'react';
import { Navigate } from 'react-router-dom';

// route hanya untuk user yang isConnected == true
// tidak dipakai lagi karena sekarang rolenya ada 2

const PrivateRouter = ({ user, children }) => {
  if (!user.isConnected) {
    return <Navigate to="/masuk/anak" replace />;
  }
  return children;
};

export default PrivateRouter;
