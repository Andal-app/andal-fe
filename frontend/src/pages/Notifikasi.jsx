import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { getMe } from '../features/authSlice';
import Layout from './Layout';

function Notifikasi() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(getMe());
  // }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <div className="column">
        <h1 className="title mt-4 is-2">Notification</h1>
        <div className="row"></div>
      </div>
    </Layout>
  );
}

export default Notifikasi;
