import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import L from 'leaflet';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function GetCurrentPosition() {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true, // Request high accuracy for location
      timeout: 10000, // Maximum time (in milliseconds) for obtaining location
      maximumAge: 0 // Maximum age (in milliseconds) for a cached position
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (err) => {
          setError(err.message);
        },
        options // Pass the options for geolocation
      );
    } else {
      setError('Geolocation is not available in this browser.');
    }
  }, []);

  return (
    <div className="GetCurrentPosition">
      {error && <p>Error: {error}</p>}
      <MapContainer
        center={userLocation || [-7.772635, 110.378682]}
        zoom={13}
        style={{ height: '480px', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userLocation && <Marker position={userLocation} />}
      </MapContainer>
    </div>
  );
}

export default GetCurrentPosition;
