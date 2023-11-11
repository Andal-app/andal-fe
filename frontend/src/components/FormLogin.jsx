import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getMeParent, loginParent, reset } from '../features/parentSlice';
import { getMeChild, loginChild, resetChild } from '../features/childSlice';
import axios from 'axios';

const FormLogin = ({ getDataByRole, registerURLByRole, roleTitle }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { parent, isSuccess, isLoading, isError } = useSelector((state) => state.parent);
  const { child, success, loading, error } = useSelector((state) => state.child);

  useEffect(() => {
    if (parent || (isSuccess && roleTitle === 'Parent')) {
      dispatch(getMeParent());
      navigate('/parent/home');
    }
    if (child || (success && roleTitle === 'Child')) {
      dispatch(getMeChild());
      navigate('/child/home');
    }
  }, [isSuccess, success, parent, child]);

  const Auth = async (e) => {
    e.preventDefault();
    if (roleTitle === 'Parent') await dispatch(loginParent({ email, password }));
    if (roleTitle === 'Child') await dispatch(loginChild({ username, password }));
    getUsers();
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_linkNgrok + getDataByRole, {
        headers: {
          'ngrok-skip-browser-warning': true,
          Authorization: `${localStorage.getItem('token')}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={Auth} className="box">
                <h1 className="title is-2 has-text-centered">{roleTitle} Login</h1>
                {roleTitle === 'Parent' && (
                  <div className="field">
                    <label htmlFor="email" className="label">
                      Email
                    </label>
                    <div className="control">
                      <input
                        type="email"
                        id="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                      />
                    </div>
                  </div>
                )}
                {roleTitle === 'Child' && (
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
                )}
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
                    {isLoading || loading ? 'Loading...' : 'Login'}
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
