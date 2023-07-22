import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const FormRegister = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [nip, setNip] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [role, setRole] = useState('Kepala Dinas');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const saveUser = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', {
        name,
        position,
        nip,
        address,
        email,
        password,
        confPassword: confPassword,
        role
      });
      navigate('/');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-6">
              <form onSubmit={saveUser} className="box">
                <p className="has-text-centered">{msg}</p>
                <h1 className="title is-2">Daftar</h1>
                <div className="field">
                  <label htmlFor="name" className="label">
                    Nama
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      id="name"
                      className="input"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Nama"
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="position" className="label">
                    Jabatan
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      id="position"
                      className="input"
                      value={position}
                      onChange={e => setPosition(e.target.value)}
                      placeholder="Jabatan Dinas"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="nip" className="label">
                    NIP
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      id="nip"
                      className="input"
                      value={nip}
                      onChange={e => setNip(e.target.value)}
                      placeholder="NIP"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="address" className="label">
                    Alamat Rumah
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      id="address"
                      className="input"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="Alamat Rumah"
                      required
                    />
                  </div>
                </div>
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
                      placeholder="kepaladinas@gmail.com"
                      autoComplete="off"
                      required
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
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Konfirmasi Ulang Kata Sandi</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={confPassword}
                      onChange={e => setConfPassword(e.target.value)}
                      placeholder="********"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Peran</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select value={role} onChange={e => setRole(e.target.value)}>
                        <option value="Kepala Dinas">Kepala Dinas</option>
                        <option value="Atasan">Atasan</option>
                        <option value="Kepegawaian">Kepegawaian</option>
                        <option value="Pegawai">Pegawai</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field has-text-centered">
                  <label className="label">
                    <span className="small">
                      Sudah daftar? <Link to="/">Masuk</Link>
                    </span>
                  </label>
                </div>
                <div className="field mt-5">
                  <div className="control">
                    <button type="submit" className="button is-success is-fullwidth">
                      Daftar
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormRegister;
