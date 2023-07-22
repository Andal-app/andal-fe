import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import AddCuti from '../components/AddCuti';
import Layout from './Layout';

function PengajuanCuti() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <AddCuti />
    </Layout>
  );
}

export default PengajuanCuti;
