import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import moment from 'moment';
import { getMeParent } from '../features/parentSlice';
import Layout from './Layout';
import Modal from '../components/Modal';
import icon from 'leaflet/dist/images/marker-icon.png';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

const markerIcon = new L.icon({
  iconUrl: icon,
  iconSize: [30, 48],
  iconAnchor: [17, 45],
  popupAnchor: [0, -46]
});

function ParentHistory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.parent);

  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState();
  const [childHistory, setChildHistory] = useState([]);
  const [showModal, setShowModal] = useState({
    id: null,
    show: false
  });

  useEffect(() => {
    dispatch(getMeParent());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError, navigate]);

  useEffect(() => {
    const getChildHistory = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(process.env.REACT_APP_linkNgrok + '/history/data', {
          headers: {
            Authorization: `${token}`
          }
        });

        if (response.status === 200) {
          const childHistoryData = response.data.map((item) => ({
            childName: item.username,
            latitude: item.latitude,
            longitude: item.longitude,
            startTime: item.start_time,
            endTime: item.end_time,
            date: item.createdAt
          }));
          setChildHistory(childHistoryData);
        } else {
          console.log('Request Error:', response.status);
        }
      } catch (error) {
        console.log('Error:', error.message);
      }
    };

    getChildHistory();
  }, []);

  function convertToIndonesianTime(time) {
    const [hour, minute] = time.split(':');
    let formattedHour = parseInt(hour);
    if (formattedHour >= 24) {
      formattedHour -= 24;
    }
    if (formattedHour < 10) {
      return `0${formattedHour}:${minute}`;
    }
    return `${formattedHour}:${minute}`;
  }

  function displayDateFormat(date) {
    if (moment(date).format('DD MMMM YYYY') !== 'Invalid date') {
      return moment(date).utcOffset(-600).format('DD MMMM YYYY HH:mm');
    } else {
      return null;
    }
  }

  const getGeocodingData = (latitude, longitude) => {
    const API_URL = 'https://nominatim.openstreetmap.org/reverse';
    axios
      .get(API_URL, {
        headers: {
          'Content-Type': 'application/json'
        },
        params: {
          lat: latitude,
          lon: longitude,
          format: 'json'
        }
      })
      .then((response) => {
        return response.display_name;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGeocodingData();
  }, []);

  return (
    <Layout roleTitle="Parent">
      <div className="column">
        <h1 className="title mt-4 is-2">History</h1>
        <div className="row">
          {childHistory.map((historyData, index) => (
            <div className="box modified ml-3" key={index}>
              <div>
                {historyData.childName}
                <br />
                Pukul: {convertToIndonesianTime(historyData.startTime)} - {convertToIndonesianTime(historyData.endTime)}{' '}
                <br />
                Lokasi: {historyData.latitude}, {historyData.longitude}
                <br />
                <button
                  onClick={() => {
                    setShowModal({ show: true, id: index });
                    setUserLocation([historyData.latitude, historyData.longitude]);
                  }}
                  onKeyDown={(e) => e.key === 'Escape' && setShowModal({ show: false })}
                  className="button is-info is-small"
                >
                  Lihat History Lokasi
                </button>
                <Modal
                  id={index}
                  show={showModal}
                  onClose={() => setShowModal({ show: false })}
                  title={`Lokasi ${historyData.childName}`}
                >
                  <MapContainer
                    center={userLocation || [-7.772635, 110.378682]}
                    zoom={16}
                    style={{ height: '400px', width: '100%' }}
                    ref={setMap}
                    className="z-index-1"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {userLocation && <Marker position={userLocation} icon={markerIcon} />}
                  </MapContainer>
                </Modal>
                <span className="to-the-right">{displayDateFormat(historyData.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ParentHistory;
