import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
    error: null
  });

  const onSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    const newLocation = {
      loaded: true,
      coordinates: {
        lat: latitude,
        lng: longitude
      }
    };
    setLocation(newLocation);
    console.log('Coordinates updated:', newLocation.coordinates);

    axios
      .post(`${process.env.REACT_APP_API_URL}location/send-location`, {
        latitude: newLocation.coordinates.lat,
        longitude: newLocation.coordinates.lng
      })
      .then((response) => {
        console.log('Location posted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error posting location:', error);
      });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error
    });
    console.error('Error getting location:', error);
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation tidak didukung'
      });
      return;
    }

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, geoOptions);
    };

    // Ambil lokasi segera saat pertama kali di-mount
    fetchLocation();

    const intervalId = setInterval(fetchLocation, 10000); // Interval 10 detik

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, []);

  return location;
};

export default useGeoLocation;
