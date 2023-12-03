import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DisplayChildren from '../components/DisplayChildren';
import Layout from './Layout';
import { getMeParent } from '../features/parentSlice';

const ParentGeofencingHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { parent } = useSelector((state) => state.parent);

  useEffect(() => {
    dispatch(getMeParent());
  }, [dispatch]);

  useEffect(() => {
    if (!parent) navigate('/');
  }, [parent, navigate]);

  return (
    <Layout roleTitle="Parent">
      <div className="column">
        <h1 className="title mt-4 is-2">Geofence History</h1>
        <DisplayChildren urlPath="/parent/history/" />
      </div>
    </Layout>
  );
};

export default ParentGeofencingHistory;
