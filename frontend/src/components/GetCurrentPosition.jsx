import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Marker } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import L from 'leaflet';

// let DefaultIcon = L.icon({
//   iconUrl: icon,
//   shadowUrl: iconShadow
// });

const markerIcon = new L.icon({
  iconUrl: icon,
  iconSize: [30, 48],
  iconAnchor: [17, 45],
  popupAnchor: [0, -46]
});

// L.Marker.prototype.options.icon = DefaultIcon;

function GetCurrentPosition({ latitude, longitude }) {
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState();
  const [error, setError] = useState(null);
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
    console.log(map);
    if (map)
      map.flyTo([latitude, longitude], zoom_level, {
        animate: true
      });
  };

  return (
    <div className="GetCurrentPosition">
      {error && <p>Error: {error}</p>}
      <button className="button is-success mb-2" onClick={showChildLocation}>
        Locate Child
      </button>
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
