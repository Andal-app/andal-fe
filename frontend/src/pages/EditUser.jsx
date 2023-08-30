import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { getMe } from '../features/authSlice';
import Layout from './Layout';
import FormEditUser from '../components/FormEditUser';

const EditUser = () => {
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
      <FormEditUser featureHeading="Edit Profil" />
    </Layout>
  );
};

export default EditUser;
