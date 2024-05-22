import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Instance axios untuk Google Maps API tanpa header Authorization
export const axiosGoogleMaps = axios.create({
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
    error: null,
    gpsStatus: 'Mengecek status...',
    batteryPercentage: 0
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
      address: address,
      gpsStatus: 'Aktif',
      batteryPercentage: await getBatteryPercentage()
    };
    setLocation(newLocation);
    console.log(newLocation);

    // Kirim data ke endpoint API
    postDataToAPI(newLocation);
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
      gpsStatus: 'Tidak Aktif atau Izin Ditolak',
      batteryPercentage: 0
    });
    console.error('Error getting location:', error);

    // Kirim data ke endpoint API
    postDataToAPI({
      ...location,
      coordinates: { lat: null, lng: null } // Set nilai null untuk latitude dan longitude
    });
  };

  // Fungsi untuk mengambil persentase baterai
  const getBatteryPercentage = async () => {
    if ('getBattery' in navigator) {
      const battery = await navigator.getBattery();
      return battery.level * 100; // Kembalikan persentase baterai
    } else {
      console.error('Battery Status API is not supported in this browser.');
      return 0;
    }
  };

  // Fungsi untuk melakukan POST data ke endpoint API
  const postDataToAPI = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}location/send-location`, {
        latitude: data.coordinates.lat,
        longitude: data.coordinates.lng,
        gpsStatus: data.gpsStatus,
        batteryPercentage: data.batteryPercentage
      })
      .then((response) => {
        console.log('Location posted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error posting location:', error);
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
