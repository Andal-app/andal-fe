import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getMeChild } from '../features/childSlice';
import GetCurrentPosition from '../components/GetCurrentPosition';
import Layout from './Layout';

function ChildHome() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { child } = useSelector((state) => state.child);
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getMeChild());
  }, [dispatch]);

  useEffect(() => {
    if (!child) {
      navigate('/');
    }
  }, [child, navigate]);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true, // Request high accuracy for location
      timeout: 10000, // Maximum time (in milliseconds) for obtaining location
      maximumAge: 0 // Maximum age (in milliseconds) for a cached position
    };
    const intervalId = setInterval(() => {
      getChildLocation();
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            axios.put(process.env.REACT_APP_linkNgrok + `/child/findCoordinates/${child}`, {
              username: child,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (err) => {
            setError(err.message);
          },
          options // Pass the options for geolocation
        );
      } else {
        setError('Geolocation is not available in this browser.');
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, [latitude, longitude]);

  const getChildLocation = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_linkNgrok + '/child/findCoordinates');
      response.data
        .filter((item) => item['username'] === localStorage.getItem('username'))
        .map((item) => {
          setLatitude(item['latitude']);
          setLongitude(item['longitude']);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="column">
        <h1 className="title mt-4 is-2">Home</h1>
        <div className="row">
          <GetCurrentPosition error={error} latitude={latitude} longitude={longitude} />
        </div>
      </div>
    </Layout>
  );
}

export default ChildHome;
