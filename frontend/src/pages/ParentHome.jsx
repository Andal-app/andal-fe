import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMeParent } from '../features/parentSlice';
import axios from 'axios';
import Layout from './Layout';
import Modal from '../components/Modal';
import DisplayChildren from '../components/DisplayChildren';

const ParentHome = () => {
  const [childUsername, setChildUsername] = useState('');
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);
  const [, setChildren] = useState([]);
  const [showModal, setShowModal] = useState({
    id: null,
    show: false
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { parent } = useSelector((state) => state.parent);

  useEffect(() => {
    dispatch(getMeParent());
  }, [dispatch]);

  useEffect(() => {
    if (!parent) {
      navigate('/');
    }
  }, [parent, navigate]);

  const getChildProfilesInformation = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_linkNgrok + '/child/findCoordinates', {
        username: childUsername
      });

      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.latitude !== null && responseData.longitude !== null) {
          setLatitude(responseData.latitude);
          setLongitude(responseData.longitude);
        } else {
          throw new Error('Data koordinat tidak ditemukan.');
        }
      } else {
        throw new Error('Gagal mengambil data koordinat.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setLatitude(0.0);
      setLongitude(0.0);
    }
  };

  const saveChildProfile = async () => {
    const newProfile = {
      username: parent,
      name: childUsername,
      latitude: latitude,
      longitude: longitude
    };
    if (newProfile.latitude === 0 && newProfile.longitude === 0) {
      alert('Akun anak tidak ditemukan');
    } else {
      try {
        const response = await axios.put(
          process.env.REACT_APP_linkNgrok + `/child/findCoordinates/${newProfile.name}`,
          {
            username: newProfile.name,
            latitude: newProfile.latitude.toString(),
            longitude: newProfile.longitude.toString()
          },
          {
            Authorization: `${localStorage.getItem('token')}`
          }
        );

        if (response.status === 200) {
          // Handle success
          alert('Akun anak berhasil terhubung');
          setShowModal({ show: false });
        } else {
          // Handle error
          alert('Gagal update profil');
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <Layout roleTitle="Parent">
      <div className="column">
        <h1 className="title mt-4 is-2">Home</h1>
        <button
          className="button is-success has-text-weight-semibold mb-2"
          onClick={() => setShowModal({ show: true })}
          onKeyDown={(e) => e.key === 'Escape' && setShowModal({ show: false })}
        >
          Tambah Profil Anak
        </button>
        <Modal
          show={showModal}
          onClose={() => {
            setShowModal({ show: false });
            setChildUsername('');
            setLatitude(0);
            setLongitude(0);
          }}
          title="Tambah Profil Anak"
        >
          <input
            type="text"
            placeholder="Username anak"
            onChange={(e) => setChildUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && getChildProfilesInformation()}
            className="input"
          />
          <div>
            <button onClick={getChildProfilesInformation} className="button maya-blue mt-2 has-text-weight-semibold">
              Dapatkan informasi anak
            </button>
          </div>
          <div>Username: {childUsername}</div>
          <div>Latitude: {latitude}</div>
          <div>Longitude: {longitude}</div>
          <button
            onClick={() => {
              saveChildProfile();
            }}
            className="button is-success mt-4"
          >
            Simpan
          </button>
        </Modal>
        <DisplayChildren urlPath="/parent/lokasianak/" />
        {/* <h2 className="has-text-weight-semibold is-size-4 mb-3">Daftar Anak</h2>
        <div className="row">
          {children
            .filter((filteredchildren) => filteredchildren['username'] === parent)
            .map((child) => (
              <NavLink to={`/parent/lokasianak/${child.name}`} className="box ml-3" key={child._id}>
                <div>{child.name}</div>
              </NavLink>
            ))}
        </div> */}
      </div>
    </Layout>
  );
};

export default ParentHome;
