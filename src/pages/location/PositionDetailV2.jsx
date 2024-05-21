import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-spring-bottom-sheet/dist/style.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { Icon } from '@iconify/react';
import 'react-spring-bottom-sheet/dist/style.css';
import BottomSheetModal from '../../components/modals/BottomSheetModal';
import ChildInfoBox from '../../components/box/ChildInfoBox';
import Sidebar from '../../components/navigation/Sidebar';
import GoogleMapsComponent from '../../components/maps/GoogleMapsComponent';
import IconBtn from '../../components/buttons/IconBtn';
import { axiosGoogleMaps } from '../../hooks/useGeoLocation';
import BottomNavbar from '../../components/navigation/BottomNavbar';

function PositionDetailV2({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [childData, setChildData] = useState([]);
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [selectPosition, setSelectPosition] = useState(null);
  const [activeGeofPosition, setActiveGeofPosition] = useState(null);
  const [activeGF, setActiveGF] = useState(null);

  const { childId } = location?.state || {}; // get current child info

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await axiosGoogleMaps.get('/geocode/json', {
        params: {
          latlng: `${lat},${lon}`,
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}child/${childId}`);
        setChildData(response.data);

        // set chld latest position
        const { latestLat, latestLong } = response.data.child;
        setSelectPosition({ lat: latestLat, lon: latestLong });

        // Set activeGF
        const activeGeofence = response.data.activeGF;
        setActiveGF(activeGeofence);

        // Set activeGeofPosition
        if (activeGeofence) {
          const { coordinates } = activeGeofence.location;
          setActiveGeofPosition({ lat: coordinates[1], lon: coordinates[0] });
        }

        // call fetchAddress
        const address = await fetchAddress(latestLat, latestLong);
        setAddress(address);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError('Terjadi kesalahan. Coba cek koneksi internet Anda.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (childId) {
      fetchData();
    }

    return () => {};
  }, [childId]);

  // control for bottom sheet modal
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // const handleOpenBottomSheet = () => {
  //   setIsBottomSheetOpen(true);
  // };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <div className="flex">
      <Sidebar user={user} />
      <BottomNavbar />

      <main className="relative mx-0 flex flex-col gap-4 w-full">
        {/* top  nav start */}
        <nav className="absolute z-10 w-full lg:w-[310px] lg:left-6 top-4 lg:top-24 flex items-center justify-center">
          {/* circular back button start */}
          <Link
            to="/beranda/orangtua"
            className="absolute left-3 flex justify-center items-center w-8 h-8 bg-violet-300 rounded-full text-black"
          >
            <Icon icon={'ion:arrow-back'} className="w-6 h-6" />
          </Link>
          {/* circular back button end */}

          <div
            id="page__title"
            className="min-w-32 max-w-fit px-4 h-9 text-b-md font-bold bg-violet-300 rounded-full flex justify-center items-center"
          >
            <p>Detail Posisi</p>
          </div>
        </nav>
        {/* top  nav end */}

        {/* map section start */}
        <div className="z-0 h-screen w-full flex justify-center items-center">
          <div className="w-full h-[100vh]">
            <GoogleMapsComponent
              selectPosition={selectPosition ? selectPosition : null}
              setSelectPosition={setSelectPosition ? setSelectPosition : null}
              secondMarkerPosition={activeGeofPosition}
              setSecondMarkerPosition={setActiveGeofPosition}
              isMarkerDraggable={false}
              showCircle={false}
            />
          </div>
        </div>
        {/* map section end */}

        {/* information detail modal start */}
        <div id="information__detail">
          {/* for small screen: show bottom sheet modal */}
          <BottomSheetModal id="bottom__sheet__modal" isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
            <ChildInfoBox data={childData} address={address} error={error} isLoading={isLoading} />
          </BottomSheetModal>

          {/* for LARGE screen: show floating box start*/}
          <div className="hidden lg:flex lg:flex-col lg:gap-2 lg:w-80 absolute top-36 left-6">
            <div className=" bg-white rounded-xl">
              {error ? (
                <p className="text-black text-center text-b-sm">{error}</p>
              ) : isLoading ? (
                <div className="h-96 w-full animate-pulse bg-neutral-50 rounded-xl"></div>
              ) : (
                <ChildInfoBox data={childData} address={address} error={error} isLoading={isLoading} />
              )}
            </div>

            {/* add and manage buttons start */}
            <div className="lg:flex gap-2">
              <div className="w-1/2 h-[40px]">
                <IconBtn
                  icon="tabler:plus"
                  text="Tambah jadwal"
                  onClick={() => [
                    navigate(`/tambahgeofence/${childData?.child?.username}`, {
                      state: {
                        childId: childData?.child?._id,
                        childUsername: childData?.child?.username,
                        childFullname: childData?.child?.fullname
                      }
                    })
                  ]}
                />
              </div>
              <div className="w-1/2 h-[40px]">
                <IconBtn
                  icon="bx:edit"
                  text="Kelola jadwal"
                  onClick={() => [
                    navigate(`/kelolajadwal/${childData?.child?.username}`, {
                      state: {
                        childId: childData?.child?._id,
                        childUsername: childData?.child?.username,
                        childFullname: childData?.child?.fullname
                      }
                    })
                  ]}
                />
              </div>
            </div>
            {/*  add and manage buttons end */}
          </div>
          {/* for LARGE screen: show floating box end*/}
        </div>
        {/* information detail modal end */}

        {/* lang and long start (temporary)*/}
        {/* <div className="bg-red-200 absolute z-10 top-10 right-10">
          <p>lat: {selectPosition?.lat}</p>
          <p>lon: {selectPosition?.lon}</p>
        </div> */}
        {/* lang and long end */}
      </main>
    </div>
  );
}

export default PositionDetailV2;