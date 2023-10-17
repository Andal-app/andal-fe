import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMeParent } from '../features/parentSlice';
import axios from 'axios';
import Layout from './Layout';
import LokasiAnak from './LokasiAnak';
// import { useGlobalState } from '../state/index.js';

const ParentHome = () => {
  const [children, setChildren] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { parent, isError } = useSelector((state) => state.parent);

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

  // const navigateToMap = () => {
  //   navigate('/parent/lokasianak');
  // };

  return (
    <Layout roleTitle="Parent">
      <div className="column">
        <h1 className="title mt-4 is-2">Home</h1>
        <div className="row">
          {children
            .filter((filteredchildren) => filteredchildren['username'] === parent)
            .map((child, index) => (
              <NavLink to={`/parent/lokasianak/${child._id}`} className="box" key={child._id}>
                <div>{child.name}</div>
              </NavLink>
              // <LokasiAnak childName={child.name} latitude={child.latitude} longitude={child.longitude} /> */}
              // <button className="box child-list" onClick={navigateToMap}>
              //   <div>{child.name}</div>
              // </button>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default ParentHome;
