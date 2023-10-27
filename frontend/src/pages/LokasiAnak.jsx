import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getMeParent } from '../features/parentSlice';
import axios from 'axios';
import GetCurrentPosition from '../components/GetCurrentPosition';
import Layout from './Layout';

function LokasiAnak() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.parent);
  const { id } = useParams();
  const [children, setChildren] = useState([]);
  const [child, setChild] = useState(null);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    dispatch(getMeParent());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const specificChild = children.filter((child) => child['_id'] === id);
    specificChild.map((item) => {
      setChild(item['name']);
      setLatitude(item['latitude']);
      setLongitude(item['longitude']);
    });
  }, [children, child, id]);

  const getUsers = async () => {
    axios
      .get(process.env.REACT_APP_linkNgrok + '/user/userProfiles')
      .then((response) => {
        // Handle successful response
        setChildren(response.data);
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

  return (
    <Layout roleTitle="Parent">
      <div className="column">
        <h1 className="title mt-4 is-2">Child Location</h1>
        <div className="row">
          <GetCurrentPosition latitude={latitude} longitude={longitude} />
        </div>
      </div>
    </Layout>
  );
}

export default LokasiAnak;
