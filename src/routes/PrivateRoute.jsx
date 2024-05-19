import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  return localStorage.getItem('username') ? <Outlet /> : <Navigate to={'/'} replace />;
}

export default PrivateRoute;
