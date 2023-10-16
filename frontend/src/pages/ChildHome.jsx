import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMeChild } from '../features/childSlice';
import Layout from './Layout';

function ChildHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { child, error } = useSelector((state) => state.child);

  useEffect(() => {
    dispatch(getMeChild());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      navigate('/');
    }
  }, [error, navigate]);

  return (
    <Layout>
      <div className="column">
        <h1 className="title mt-4 is-2">Home</h1>
        <div className="row"></div>
      </div>
    </Layout>
  );
}

export default ChildHome;
