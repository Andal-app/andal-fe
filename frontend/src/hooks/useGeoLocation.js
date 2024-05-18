import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' }
  });

  const onSuccess = (location) => {
    const { latitude, longitude } = location.coords;
    // Tambahkan variasi acak pada koordinat untuk simulasi
    const newLocation = {
      loaded: true,
      coordinates: {
        lat: latitude,
        lng: longitude
      }
    };
    setLocation(newLocation);
    // Log perubahan koordinat
    console.log('Coordinates updated:', newLocation.coordinates);

    // Kirim data lokasi ke server
    axios
      .post(process.env.REACT_APP_API_URL + 'location/send-location', {
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
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation tidak didukung'
      });
      return;
    }

    // Ambil lokasi segera saat pertama kali di-mount
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, 5000); // Interval 10 detik

    // Membersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, []);

  return location;
};

export default useGeoLocation;
