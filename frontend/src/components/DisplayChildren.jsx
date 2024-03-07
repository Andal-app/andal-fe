import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const DisplayChildren = ({ children, setChildren, urlPath }) => {
  const { parent } = useSelector((state) => state.parent);

  useEffect(() => {
    getChildren();
  }, [children]);

  const getChildren = async () => {
    await axios
      .get(process.env.REACT_APP_linkNgrok + '/user/userProfiles', {
        headers: {
          'ngrok-skip-browser-warning': true,
          Authorization: `${localStorage.getItem('token')}`
        }
      })
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
    <>
      <h2 className="has-text-weight-semibold is-size-4 mb-3">Daftar Anak</h2>
      <div className="row">
        {children
          .filter((filteredchildren) => filteredchildren['username'] === parent)
          .map((child) => (
            <NavLink to={`${urlPath}${child.name}`} className="box ml-3" key={child._id}>
              <div>{child.name}</div>
            </NavLink>
          ))}
      </div>
    </>
  );
};

export default DisplayChildren;
