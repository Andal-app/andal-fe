import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GeofencingLocation = ({ map, geofenceData }) => {
  const [geofenceLocation, setGeofenceLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [geofenceRadius] = useState(100); // Assuming a default value
  const [geofenceStartTime, setGeofenceStartTime] = useState({ hour: 0, minute: 0 }); // Assuming structure similar to Dart TimeOfDay
  const [geofenceEndTime, setGeofenceEndTime] = useState({ hour: 0, minute: 0 });
  const [isInsideGeofence, setIsInsideGeofence] = useState(false);
  const [distanceToGeofence, setDistanceToGeofence] = useState(null);

  const { childname } = useParams();

  let circle;

  useEffect(() => {
    getCurrentLocation();
    getGeofenceLocation();
  }, [geofenceData]);

  useEffect(() => {
    displayGeofenceLocation();
  }, [geofenceLocation, geofenceStartTime]);

  useEffect(() => {
    checkGeofence();
  }, [geofenceLocation, currentLocation, geofenceStartTime, geofenceEndTime]);

  const getCurrentLocation = async () => {
    axios
      .get(process.env.REACT_APP_linkNgrok + '/child/findCoordinates')
      .then((response) => {
        const responses = response.data;
        responses
          .filter((currentLocationChild) => currentLocationChild['username'] === childname)
          .map((item) => {
            setCurrentLocation({ latitude: item['latitude'], longitude: item['longitude'] });
          });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const getGeofenceLocation = async () => {
    axios
      .get(process.env.REACT_APP_linkNgrok + '/geofence/data')
      .then((response) => {
        const responses = response.data;
        responses
          .filter((geofenceLocationChild) => geofenceLocationChild['username'] === childname)
          .map((item) => {
            setGeofenceLocation({ latitude: item['latitude'], longitude: item['longitude'] });
            const startHour = parseInt(item.start_time.match(/\d+(?=:)/g));
            const startMinute = parseInt(item.start_time.match(/(?<=:)\d+/g));
            setGeofenceStartTime({ hour: startHour, minute: startMinute });
            const endHour = parseInt(item.end_time.match(/\d+(?=:)/g));
            const endMinute = parseInt(item.end_time.match(/(?<=:)\d+/g));
            setGeofenceEndTime({ hour: endHour, minute: endMinute });
          });
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // Function to check if the current time is within the geofence time
  const isWithinGeofenceTime = () => {
    const currentTime = new Date(); // Get current time
    const startTime = new Date(currentTime);
    startTime.setHours(geofenceStartTime.hour, geofenceStartTime.minute, 0, 0);
    const endTime = new Date(currentTime);
    endTime.setHours(geofenceEndTime.hour, geofenceEndTime.minute, 0, 0);

    return currentTime >= startTime && currentTime <= endTime;
  };

  // Function to calculate distance between two coordinates using Haversine formula
  const calculateDistance = (start, end) => {
    const earthRadius = 6371000; // Earth radius in meters
    const lat1Rad = (start.latitude * Math.PI) / 180;
    const lat2Rad = (end.latitude * Math.PI) / 180;
    const deltaLatRad = ((end.latitude - start.latitude) * Math.PI) / 180;
    const deltaLngRad = ((end.longitude - start.longitude) * Math.PI) / 180;

    const a =
      Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLngRad / 2) * Math.sin(deltaLngRad / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  };

  const checkGeofence = () => {
    if (geofenceLocation && currentLocation) {
      const distance = calculateDistance(currentLocation, geofenceLocation);
      setDistanceToGeofence(distance);
      const radius = geofenceRadius;
      const isInside = distance <= radius && isWithinGeofenceTime(); // Update condition
      setIsInsideGeofence(isInside); // Assuming setIsInsideGeofence is a state setter
    }
  };

  const displayGeofenceLocation = () => {
    if (geofenceLocation) {
      if (circle !== undefined) {
        map.removeLayer(circle);
      }
      circle = L.circle([geofenceLocation.latitude, geofenceLocation.longitude], geofenceRadius).addTo(map);
    }
  };

  if (geofenceData.filter((geofencedChild) => geofencedChild['username'] === childname).length > 0) {
    return isInsideGeofence ? (
      <div>
        Status Lokasi: <span style={{ color: '#22B14C' }}>Di dalam area geofence</span>
      </div>
    ) : (
      <div>
        Status Lokasi:{' '}
        <span style={{ color: '#ED1C24' }}>
          Di luar area geofence{' '}
          {distanceToGeofence && `(${Math.round(distanceToGeofence) - 100} meter ke radius geofence)`}
        </span>
      </div>
    );
  } else {
    return <div>Status Lokasi: Tidak ada geofence</div>;
  }
};

export default GeofencingLocation;
