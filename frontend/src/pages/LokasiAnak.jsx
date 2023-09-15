import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useJsApiLoader, Marker } from '@react-google-maps/api';
// import { getMe } from '../features/authSlice';
import GoogleMap from '../components/GoogleMap';
import GoogleMapsAPI from '../utils/env';
import Layout from './Layout';

function LokasiAnak() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: GoogleMapsAPI
  // });

  // if (!isLoaded) return <div>Loading...</div>;
  // return <div>Map</div>;

  // useEffect(() => {
  //   dispatch(getMe());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (isError) {
  //     navigate('/');
  //   }
  // }, [isError, navigate]);

  return (
    <Layout>
      <div className="column">
        <h1 className="title mt-4 is-2">Child Location</h1>
        <div className="row">
          <GoogleMap />
        </div>
      </div>
    </Layout>
  );
}

export default LokasiAnak;
