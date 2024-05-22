import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import 'react-spring-bottom-sheet/dist/style.css';
import BottomSheetModal from '../../components/modals/BottomSheetModal';
import GeofencePageLayout from '../../layouts/geofencing/GeofencePageLayout';
import AddGeoForm from '../../components/inputs/AddGeoForm';
import MapsSearchBox from '../../components/maps/MapsSearchBox';
import GoogleMapsSearchBox from '../../components/maps/GoogleMapsSearchBox';

function EditGeofencing({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { childId, childFullname } = location?.state || {}; // get current child info

  const { geofenceId } = useParams();

  const [geofenceData, setGeofenceData] = useState([]);
  const [selectPosition, setSelectPosition] = useState(null); // dapatkan koordinat [lintang, bujur]
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // control for bottom sheet modal

  const [formData, setFormData] = useState({
    geofenceName: '',
    radius: '',
    startTime: '',
    endTime: ''
  });

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // handle input change untuk time picker pada AddGeoForm
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const setStartTime = (time) => {
    if (time) {
      const formattedTime = formatTime(time);
      setFormData((prevFormData) => ({
        ...prevFormData,
        startTime: formattedTime
      }));
    }
  };

  const setEndTime = (time) => {
    if (time) {
      const formattedTime = formatTime(time);
      setFormData((prevFormData) => ({
        ...prevFormData,
        endTime: formattedTime
      }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `geofence-schedule/${geofenceId}`);

        setGeofenceData(response.data.geofence);

        // Set initial form data
        setFormData({
          geofenceName: response.data.geofence.geofenceName,
          radius: response.data.geofence.radius,
          startTime: response.data.geofence.startTime,
          endTime: response.data.geofence.endTime
        });

        // Set the position after fetching the geofence data
        const { coordinates } = response.data.geofence.location;
        setSelectPosition({
          lat: coordinates[1],
          lon: coordinates[0]
        });
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Terjadi kesalahan. Coba cek koneksi internet Anda.');
        }
      }
    };

    fetchData();

    return () => {};
  }, []);

  // post data titik dan informasi geofencing
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectPosition) {
      toast.error('Tambahkan titik lokasi terlebih dahulu');
      return;
    }

    try {
      await axios
        .patch(process.env.REACT_APP_API_URL + `geofence-schedule/${geofenceId}`, {
          geofenceName: formData.geofenceName,
          radius: formData.radius,
          latitude: selectPosition?.lat,
          longitude: selectPosition?.lon,
          startTime: formData.startTime,
          endTime: formData.endTime,
          radius: 100
        })
        .then((res) => {
          // console.log('Response:', res);
          toast.success(res.data.message);
          // navigate(`/detailposisi/${childUsername}`);
        });
    } catch (err) {
      if (err.response) {
        // console.log(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        // console.log(err.message);
        toast.error('Terjadi kesalahan. Coba cek koneksi internet Anda.');
      }
    }
  };

  return (
    <GeofencePageLayout
      pageTitle="Edit Geofence"
      user={user}
      selectPosition={selectPosition}
      setSelectPosition={setSelectPosition}
      showChildMarker={false}
      showGeofMarker={true}
      isMarkerDraggable={true}
      circleRadius={parseFloat(formData.radius) || 0}
    >
      {/* for small screen: show bottom sheet modal */}
      <BottomSheetModal id="bottom__sheet__modal" isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
        <AddGeoForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          btnText="Simpan"
        />
      </BottomSheetModal>

      {/* for large screen: show floating box */}
      <div className="hidden lg:flex lg:flex-col lg:gap-1 absolute top-36 left-6">
        {/* searchbar start */}
        <div className="w-full lg:w-[310px] flex items-center justify-center">
          <GoogleMapsSearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
        </div>
        {/* searchbar end */}

        {/* add geofencing form start */}
        <div className="bg-white rounded-xl py-0.5">
          <AddGeoForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            btnText="Simpan"
          />
        </div>
        {/* add geofencing form end */}

        {/* lang and long start (temporary)*/}
        <div className="bg-red-200">
          <p>lat: {selectPosition?.lat}</p>
          <p>lon: {selectPosition?.lon}</p>
        </div>
        {/* lang and long end */}
      </div>
    </GeofencePageLayout>
  );
}

export default EditGeofencing;
