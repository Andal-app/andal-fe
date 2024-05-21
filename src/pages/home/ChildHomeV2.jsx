import React, { useState, useEffect } from 'react';
import PositionDetailBox from '../../components/box/PositionDetailBox';
import GoogleMapsComponent from '../../components/maps/GoogleMapsComponent';
import useGeoLocation from '../../hooks/useGeoLocation';
import HomeLayout from '../../layouts/home/HomeLayout';

function LocationDetail({ setSelectPosition }) {
  const location = useGeoLocation();
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (location.loaded && location.coordinates) {
      setSelectPosition({
        lat: location.coordinates.lat,
        lon: location.coordinates.lng
      });
      setAddress(location.address);
    }
  }, [location, setSelectPosition]);

  return (
    <div className="bg-white lg:max-w-96 lg:max-h-[200px] overflow-auto lg:absolute lg:top-32 lg:left-8 lg:z-10 lg:rounded-xl lg:drop-shadow-xl lg:p-5">
      {location.loaded ? (
        <PositionDetailBox lat={location.coordinates.lat} lng={location.coordinates.lng} address={address} />
      ) : (
        <p>Lokasi belum tersedia</p>
      )}
    </div>
  );
}

function ChildHomeV2({ user }) {
  const [selectPosition, setSelectPosition] = useState(null);

  return (
    <HomeLayout user={user}>
      <div className="relative mx-6 lg:mx-0 flex flex-col gap-3 lg:gap-4">
        {/* page title start */}
        <div className="lg:absolute lg:top-24 lg:left-8 lg:z-10 bg-violet-700 w-fit px-5 py-0.5 text-b-md font-bold rounded-md text-white">
          Posisi saya
        </div>
        {/* page title end */}

        {/* map start */}
        <div className="lg:z-0 bg-neutral-400 h-72 lg:h-screen">
          <div className="w-full h-[100vh]">
            <GoogleMapsComponent
              showChildMarker={true}
              childMarkerPosition={selectPosition}
              setChildMarkerPosition={setSelectPosition}
              isMarkerDraggable={false}
              showCircle={false}
            />
          </div>
        </div>
        {/* map end */}

        {/* position detail start */}
        <LocationDetail setSelectPosition={setSelectPosition} />
        {/* position detail end */}
      </div>
    </HomeLayout>
  );
}

export default ChildHomeV2;
