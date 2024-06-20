import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const GoogleMapsWrapper = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={['places', 'drawing']}>
      {children}
    </LoadScript>
  );
};

export default GoogleMapsWrapper;
