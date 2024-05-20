import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Instance axios untuk Google Maps API tanpa header Authorization
const axiosGoogleMaps = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
    address: '',
    error: null
  });

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axiosGoogleMaps.get('/geocode/json', {
        params: {
          latlng: `${lat},${lng}`,
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        }
      });
      const address = response.data.results[0]?.formatted_address || 'Alamat tidak ditemukan';
      return address;
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Error fetching address';
    }
  };

  const onSuccess = async (position) => {
    const { latitude, longitude } = position.coords;
    const address = await fetchAddress(latitude, longitude);
    const newLocation = {
      loaded: true,
      coordinates: {
        lat: latitude,
        lng: longitude
      },
      address: address
    };
    setLocation(newLocation);
    console.log('Coordinates and address updated:', newLocation);

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

    fetchLocation();

    // const intervalId = setInterval(fetchLocation, 10000); // Interval 10 detik

    // return () => clearInterval(intervalId);
  }, []);

  return location;
};

export default useGeoLocation;
