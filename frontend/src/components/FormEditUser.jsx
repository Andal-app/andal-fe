import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const FormEditUser = ({ featureHeading, disabled, children, quota, setQuota }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [nip, setNip] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password] = useState('');
  const [confPassword] = useState('');
  const [role, setRole] = useState('Kepala Dinas');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setPosition(response.data.position);
        setNip(response.data.nip);
        setAddress(response.data.address);
        setEmail(response.data.email);
        setRole(response.data.role);
        setQuota(response.data.quota);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name,
        position,
        nip,
        address,
        email,
        password,
        confPassword: confPassword,
        role,
        quota
      });
      navigate('/users');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="column is-6">
      <h1 className="title mt-4 is-2">{featureHeading}</h1>
      {/* <form onSubmit={updateUser}>
        <p className="has-text-centered">{msg}</p>
        <h1 className="title mt-4 is-2">{featureHeading}</h1>
        <div className="field">
          <label className="label">Nama</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={disabled}
              placeholder="Nama"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Jabatan</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={position}
              onChange={e => setPosition(e.target.value)}
              disabled={disabled}
              placeholder="Jabatan"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">NIP</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={nip}
              onChange={e => setNip(e.target.value)}
              disabled={disabled}
              placeholder="NIP"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Alamat Rumah</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={address}
              onChange={e => setAddress(e.target.value)}
              disabled={disabled}
              placeholder="Alamat Rumah"
            />
          </div>
        </div>
        {/* <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={disabled}
              placeholder="Email"
            />
          </div>
        </div> */}
      {/* {user && user.role === 'Kepegawaian' && (
          <div className="field">
            <label className="label">Peran</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select value={role} onChange={e => setRole(e.target.value)} disabled={disabled}>
                  <option value="Kepala Dinas">Kepala Dinas</option>
                  <option value="Atasan">Atasan</option>
                  <option value="Kepegawaian">Kepegawaian</option>
                  <option value="Pegawai">Pegawai</option>
                </select>
              </div>
            </div>
          </div>
        )}
        {children}
        <div className="field mt-5">
          <div className="control">
            <button type="submit" className="button is-success is-fullwidth">
              Save
            </button>
          </div>
        </div>
      </form> */}
    </div>
  );
};

export default FormEditUser;
