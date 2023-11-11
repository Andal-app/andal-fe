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

  useEffect(() => {
    dispatch(getMeChild());
    getChildLocation();
  }, [dispatch]);

  useEffect(() => {
    if (!child) {
      navigate('/');
    }
  }, [child, navigate]);

  const getChildLocation = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_linkNgrok + '/child/findCoordinates');
      response.data
        .filter((item) => item['username'] === localStorage.getItem('username'))
        .map((item) => {
          console.log(item['latitude']);
          console.log(item['longitude']);
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
          <GetCurrentPosition latitude={latitude} longitude={longitude} />
        </div>
      </div>
    </Layout>
  );
}

export default ChildHome;
