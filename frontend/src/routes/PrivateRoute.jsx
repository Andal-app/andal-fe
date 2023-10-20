import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  const { parent } = useSelector((state) => state.parent);
  const { child } = useSelector((state) => state.child);
  return localStorage.getItem('username') ? <Outlet /> : <Navigate to={'/'} replace />;
}

export default PrivateRoute;
