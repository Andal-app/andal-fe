import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../features/authSlice';
import axios from 'axios';
import Layout from './Layout';
import { useGlobalState } from '../state/index.js';

const Home = () => {
  const [children, setChildren] = useState([]);
  // const [isLogin, setIsLogin] = useGlobalState('isLogin');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

  useEffect(() => {
    getUsers();
  }, []);

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
    <Layout>
      <div className="column">
        <h1 className="title mt-4 is-2">Home</h1>
        <div className="row">
          {children
            .filter((child) => child['username'] === user)
            .map((filteredchild, index) => (
              <NavLink to={'/lokasianak'} className="box" key={filteredchild._id}>
                <div>{filteredchild.name}</div>
              </NavLink>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
