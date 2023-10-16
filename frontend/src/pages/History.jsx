import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { getMeParent } from '../features/parentSlice';
import Layout from './Layout';

function History() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.parent);

  // useEffect(() => {
  //   dispatch(getMeParent());
  // }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

  return (
    <Layout roleTitle="Parent">
      <div className="column">
        <h1 className="title mt-4 is-2">History</h1>
        <div className="row"></div>
      </div>
    </Layout>
  );
}

export default History;
