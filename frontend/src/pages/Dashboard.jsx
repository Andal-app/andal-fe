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
        <h1 className="title mt-4 is-2">Beranda</h1>
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">Jatah Cuti</div>
              <div className="card-footer d-flex align-items-center justify-content-between"></div>
              {/* <span className="card-text">{user && user.quota}</span> */}
            </div>
          </div>
          {/* {user && calculateCuti()} */}
          <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">Jumlah Cuti Terpakai</div>
              <div className="card-footer d-flex align-items-center justify-content-between"></div>
              {/* <span className="card-text">{usedCuti}</span> */}
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">Jumlah Sisa Cuti</div>
              <div className="card-footer d-flex align-items-center justify-content-between"></div>
              {/* <span className="card-text">{restCuti}</span> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
