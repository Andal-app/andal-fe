import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

import Geocode from 'react-geocode';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function ChildLocationMapPage(props) {
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [geofenceLocation, setGeofenceLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [circles, setCircles] = useState([]);
  const [isLocationServiceEnabled, setLocationServiceEnabled] = useState(false);

  useEffect(() => {
    _getAddressFromCoordinates();
    _checkLocationPermissionStatus();

    // Start an interval to update location every 5 seconds
    const autoUpdateTimer = setInterval(() => {
      if (isLocationServiceEnabled) {
        getDataFromAPI();
        _getAddressFromCoordinates();
      }
    }, 5000);

    return () => clearInterval(autoUpdateTimer);
  }, [isLocationServiceEnabled]);

  const getDataFromAPI = async () => {
    // Your API request to get child's location data
    // Update currentLocation with the received data
    // Example:
    // const response = await fetch('your_api_url_here');
    // const data = await response.json();
    // setCurrentLocation({ lat: data.latitude, lng: data.longitude });
  };

  const _getAddressFromCoordinates = async () => {
    // Use reverse geocoding to get the address from coordinates
    Geocode.fromLatLng(currentLocation.lat, currentLocation.lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        setAddress(address);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const _checkLocationPermissionStatus = async () => {
    // Check and update the location service permission status
    const status = await navigator.permissions.query({ name: 'geolocation' });
    if (status.state === 'granted') {
      setLocationServiceEnabled(true);
    }
  };

  return (
    <div>
      <h1>Peta Lokasi Anak</h1>
      <div>
        <MapContainer
          center={[currentLocation.lat, currentLocation.lng]}
          zoom={16}
          style={{ height: '480px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {currentLocation && <Marker position={[currentLocation.lat, currentLocation.lng]} icon={DefaultIcon} />}
          {geofenceLocation && (
            <Circle
              center={[geofenceLocation.lat, geofenceLocation.lng]}
              radius={100} // Set the radius as needed
              fillColor="blue"
              fillOpacity={0.2}
              color="blue"
              weight={2}
            />
          )}
        </MapContainer>
        <div>
          <h2>Informasi Anak</h2>
          <p>Nama Anak: {props.childName}</p>
          <p>
            Lokasi: {address} ({currentLocation.lat}, {currentLocation.lng})
          </p>
          <p>
            Jadwal: {props.geofenceStartTime.format('HH:mm')} - {props.geofenceEndTime.format('HH:mm')}
          </p>
          <p>Status Lokasi: {isInsideGeofence ? 'Di Dalam Area' : 'Di Luar Area'}</p>
          <button onClick={_selectLocation}>Pilih Koordinat Geofence</button>
        </div>
      </div>
    </div>
  );
}

export default ChildLocationMapPage;
