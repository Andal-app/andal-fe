import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../features/authSlice';
import CutiList from '../components/CutiList';
import Layout from './Layout';
import { useGlobalState } from '../state';

let restCuti, usedCuti;

const Dashboard = () => {
  const [cutiData, setCutiData] = useGlobalState('cutiData');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

  function calculateCuti() {
    restCuti = user.quota;
    usedCuti = 0;
    cutiData.forEach(cutiOneData => {
      if (cutiOneData.user.name === user.name) {
        usedCuti += cutiOneData.duration;
        restCuti -= cutiOneData.duration;
      }
    });
  }

  return (
    <Layout>
      <div className="column">
        <h1 className="title mt-4 is-2">Beranda</h1>
        <div className="row">
          <div className="col-xl-3 col-md-6">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">Jatah Cuti</div>
              <div className="card-footer d-flex align-items-center justify-content-between"></div>
              <span className="card-text">{user && user.quota}</span>
            </div>
          </div>
          {user && calculateCuti()}
          <div className="col-xl-3 col-md-6">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">Jumlah Cuti Terpakai</div>
              <div className="card-footer d-flex align-items-center justify-content-between"></div>
              <span className="card-text">{usedCuti}</span>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">Jumlah Sisa Cuti</div>
              <div className="card-footer d-flex align-items-center justify-content-between"></div>
              <span className="card-text">{restCuti}</span>
            </div>
          </div>
        </div>
        <CutiList cutiData={cutiData} setCutiData={setCutiData} />
      </div>
    </Layout>
  );
};

export default Dashboard;
