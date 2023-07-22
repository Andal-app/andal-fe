import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser, reset } from '../features/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(state => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      navigate('/dashboard');
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = e => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={Auth} className="box">
                {isError && <p className="has-text-centered">{message}</p>}
                <h1 className="title is-2">Masuk</h1>
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
                      onChange={e => setEmail(e.target.value)}
                      placeholder="pegawai@gmail.com"
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="password" className="label">
                    Kata Sandi
                  </label>
                  <div className="control">
                    <input
                      type="password"
                      id="password"
                      className="input"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="********"
                    />
                  </div>
                </div>
                <div className="field has-text-centered">
                  <label className="label">
                    <span className="small">
                      Belum Daftar? <Link to="/daftar">Daftar</Link>
                    </span>
                  </label>
                </div>
                <div className="field mt-5">
                  <button type="submit" className="button is-success is-fullwidth">
                    {isLoading ? 'Memuat...' : 'Masuk'}
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

export default Login;
