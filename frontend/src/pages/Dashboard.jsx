import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from './Layout';
import { useGlobalState } from '../state/index.js';

const Dashboard = () => {
  const [isLogin, setIsLogin] = useGlobalState('isLogin');
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.auth);
  setIsLogin(true);
  console.log(isLogin);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <div className="column">
        <h1 className="title mt-4 is-2">Home</h1>
        <div className="row"></div>
      </div>
    </Layout>
  );
};

export default Dashboard;
