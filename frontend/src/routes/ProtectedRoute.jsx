import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getMeParent } from '../features/parentSlice';

const ProtectedRoute = () => {
  const { parent } = useSelector((state) => state.parent);
  const { child } = useSelector((state) => state.child);
  return !localStorage.getItem('username') ? (
    <Outlet />
  ) : localStorage.getItem('role') === 'Parent' ? (
    <Navigate to={'/parent/home'} />
  ) : (
    <Navigate to={'/child/home'} />
  );
  // const dispatch = useDispatch();

  // useEffect(() => {
  // }, []);
  // if (parent !== null) {
  //   return <Navigate to={'/parent/home'} replace />;
  // } else {
  //   return <Outlet />;
  // }
};

export default ProtectedRoute;
