import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMeParent } from '../features/parentSlice';
import axios from 'axios';
import { useGlobalState } from '../state';
import Layout from './Layout';
import GetCurrentPosition from '../components/GetCurrentPosition';

function LokasiAnak() {
  const [children, setChildren] = useState([]);
  const [child, setChild] = useGlobalState('child');
  const [latitude, setLatitude] = useGlobalState('latitude');
  const [longitude, setLongitude] = useGlobalState('longitude');
  const [, setAllChildren] = useGlobalState('allChildren');
  const [, setSpecificChild] = useGlobalState('specificChild');
  const [, setGeofenceData] = useGlobalState('geofenceData');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.parent);
  const { childname } = useParams();

  useEffect(() => {
    dispatch(getMeParent());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

  const getUsers = async () => {
    axios
      .get(process.env.REACT_APP_linkNgrok + '/child/findCoordinates')
      .then((response) => {
        // Handle successful response
        setChildren(response.data);
        setAllChildren(response.data);
      })
      .catch((error) => {
        // Handle errors
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log('Response Error:', error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Request Error:', error.request);
        } else {
          // Something else happened while setting up the request
          console.log('Error:', error.message);
        }
      });
  };

  const getGeofenceData = async () => {
    await axios
      .get(process.env.REACT_APP_linkNgrok + '/geofence/data')
      .then((response) => {
        setGeofenceData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log('Response Error:', error.response.status);
        } else if (error.request) {
          console.log('Request Error:', error.request);
        } else {
          console.log('Error:', error.message);
        }
      });
  };

  useEffect(() => {
    getUsers();
    getGeofenceData();
  }, []);

  useEffect(() => {
    const specificChildName = children.filter((child) => child['username'] === childname);
    specificChildName.map((item) => {
      setChild(item['username']);
      setLatitude(item['latitude']);
      setLongitude(item['longitude']);
    });
    setSpecificChild(specificChildName);
  }, [children, child, childname]);

  return (
    <Layout roleTitle="Parent">
      <div className="column">
        <h1 className="title mt-4 is-2">Child Location</h1>
        <div className="row">
          <GetCurrentPosition isShowSearch={false} latitude={latitude} longitude={longitude} isShowButton={true} />
        </div>
      </div>
    </Layout>
  );
}

export default LokasiAnak;
