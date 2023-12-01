import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMeParent } from '../features/parentSlice';
import axios from 'axios';
import moment from 'moment';
import Layout from './Layout';

function ParentNotificationHistory() {
  const [notificationHistory, setNotificationHistory] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.parent);

  useEffect(() => {
    dispatch(getMeParent());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

  useEffect(() => {
    const getNotificationHistory = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(process.env.REACT_APP_linkNgrok + '/notif/data', {
          headers: {
            Authorization: `${token}`
          }
        });
        setNotificationHistory(response.data);
      } catch (error) {
        console.log('Error:', error.message);
      }
    };
    getNotificationHistory();
  }, []);

  function displayDateFormat(date) {
    if (moment(date).format('DD MMMM YYYY') !== 'Invalid date') {
      return moment(date).format('DD MMMM YYYY HH:mm');
    } else {
      return null;
    }
  }

  return (
    <Layout roleTitle="Parent">
      <div className="column">
        <h1 className="title mt-4 is-2">Notification History</h1>
        <div className="row">
          {notificationHistory.map((notificationData, index) => (
            <div className="box modified ml-3" key={index}>
              <div>{notificationData.username}</div>
              <div>Status Lokasi: {notificationData.status} area geofence</div>
              <div className="to-the-right">{displayDateFormat(notificationData.createdAt)}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ParentNotificationHistory;
