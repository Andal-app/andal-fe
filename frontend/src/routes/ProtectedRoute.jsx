import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  return !localStorage.getItem('username') ? (
    <Outlet />
  ) : localStorage.getItem('role') === 'Parent' ? (
    <Navigate to={'/parent/home'} />
  ) : (
    <Navigate to={'/child/home'} />
  );
};

export default ProtectedRoute;
