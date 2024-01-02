import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMeParent } from '../features/parentSlice';
import DisplayChildren from '../components/DisplayChildren';
import Layout from './Layout';

const ParentNotificationHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { parent } = useSelector((state) => state.parent);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    dispatch(getMeParent());
  }, [dispatch]);

  useEffect(() => {
    if (!parent) navigate('/');
  }, [parent, navigate]);

  return (
    <Layout roleTitle="Parent">
      <div className="column">
        <h1 className="title mt-4 is-2">Notification History</h1>
        <DisplayChildren children={children} setChildren={setChildren} urlPath="/parent/notification_history/" />
      </div>
    </Layout>
  );
};

export default ParentNotificationHistory;
