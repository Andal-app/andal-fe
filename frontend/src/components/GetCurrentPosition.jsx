import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Marker } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useParams, useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import { useGlobalState } from '../state';
import Modal from './Modal';

import L from 'leaflet';
import TimePickerComponent from './TimePickerComponent';

const markerIcon = new L.icon({
  iconUrl: icon,
  iconSize: [30, 48],
  iconAnchor: [17, 45],
  popupAnchor: [0, -46]
});

function GetCurrentPosition({ latitude, longitude }) {
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState();
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState({
    id: null,
    show: false
  });
  const [allChildren, setAllChildren] = useGlobalState('allChildren');
  const { id } = useParams();
  const navigate = useNavigate();
  const zoom_level = 18;

  const _created = (e) => console.log(e);

  useEffect(() => {
    console.log(latitude);
    console.log(longitude);
    const options = {
      enableHighAccuracy: true, // Request high accuracy for location
      timeout: 10000, // Maximum time (in milliseconds) for obtaining location
      maximumAge: 0 // Maximum age (in milliseconds) for a cached position
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([latitude || position.coords.latitude, longitude || position.coords.longitude]);
        },
        (err) => {
          setError(err.message);
        },
        options // Pass the options for geolocation
      );
    } else {
      setError('Geolocation is not available in this browser.');
    }
  }, [latitude, longitude]);

  const showChildLocation = () => {
    if (map)
      map.flyTo([latitude, longitude], zoom_level, {
        animate: true
      });
  };

  const specificChild = allChildren.filter((child) => child['_id'] === id);

  return (
    <div className="GetCurrentPosition">
      {error && <p>Error: {error}</p>}
      <button className="button is-success has-text-weight-semibold mb-2 mr-5" onClick={showChildLocation}>
        Locate Child
      </button>
      <button
        className="button is-success verdigris text-eerie-black has-text-weight-semibold mb-2"
        onClick={() => {
          navigate('/parent/set_schedule');
        }}
      >
        Pasang Geofence
      </button>
      <Modal id={id} show={showModal} onClose={() => setShowModal(false)}>
        <TimePickerComponent />
      </Modal>
      <div>Nama anak: {specificChild[0].name}</div>
      <div>
        Lokasi &emsp;&emsp;: {specificChild[0].latitude}, {specificChild[0].longitude}
      </div>
      <MapContainer
        center={userLocation || [-7.772635, 110.378682]}
        zoom={14}
        style={{ height: '480px', width: '100%' }}
        ref={setMap}
      >
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_created}
            draw={{ polyline: false, polygon: false, rectangle: false, circlemarker: false, marker: false }}
          />
        </FeatureGroup>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation && <Marker position={userLocation} icon={markerIcon} />}
      </MapContainer>
    </div>
  );
}

export default GetCurrentPosition;
