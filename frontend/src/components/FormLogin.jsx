import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser, LoginChild, reset } from '../features/authSlice';
import axios from 'axios';
import linkNgrok from '../utils/env';

const FormLogin = ({ getDataByRole, registerURLByRole, roleTitle }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    axios
      .get(linkNgrok + getDataByRole, {
        headers: {
          'ngrok-skip-browser-warning': true
        }
      })
      .then((response) => {
        // Handle successful response
        console.log(response.data);
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

  const Auth = (e) => {
    e.preventDefault();
    roleTitle == 'Parent' ? dispatch(LoginUser({ username, password })) : dispatch(LoginChild({ username, password }));
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={Auth} className="box">
                <h1 className="title is-2 has-text-centered">{roleTitle} Login</h1>
                <div className="field">
                  <label htmlFor="username" className="label">
                    Username
                  </label>
                  <div className="control">
                    <input
                      type="username"
                      id="username"
                      className="input"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <div className="control">
                    <input
                      type="password"
                      id="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                      required
                    />
                  </div>
                </div>
                <div className="field has-text-centered">
                  <label className="label">
                    <span className="small">
                      Don't have an account? <Link to={registerURLByRole}>Register</Link>
                    </span>
                  </label>
                </div>
                <div className="field mt-5">
                  <button type="submit" className="button is-success is-fullwidth">
                    {isLoading ? 'Loading...' : 'Login'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormLogin;
