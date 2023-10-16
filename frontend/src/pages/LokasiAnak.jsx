import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { getMeParent } from '../features/parentSlice';
import OpenStreetMap from '../components/OpenStreetMap';
import GetCurrentPosition from '../components/GetCurrentPosition';
import Layout from './Layout';

function LokasiAnak() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.parent);

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: GoogleMapsAPI
  // });

  // if (!isLoaded) return <div>Loading...</div>;
  // return <div>Map</div>;

  // useEffect(() => {
  //   dispatch(getMeParent());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (isError) {
  //     navigate('/');
  //   }
  // }, [isError, navigate]);

  return (
    <Layout roleTitle="Parent">
      <div className="column">
        <h1 className="title mt-4 is-2">Child Location</h1>
        <div className="row">
          <GetCurrentPosition />
        </div>
      </div>
    </Layout>
  );
}

export default LokasiAnak;
