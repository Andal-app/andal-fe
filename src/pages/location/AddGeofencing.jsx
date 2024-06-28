import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import 'react-spring-bottom-sheet/dist/style.css';
import BottomSheetModal from '../../components/modals/BottomSheetModal';
import GeofencePageLayout from '../../layouts/geofencing/GeofencePageLayout';
import AddGeoForm from '../../components/inputs/AddGeoForm';
import GoogleMapsSearchBox from '../../components/maps/GoogleMapsSearchBox';

function AddGeofencing({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { childId, childFullname } = location?.state || {}; // get current child info
  const { childUsername } = useParams();

  const [selectPosition, setSelectPosition] = useState(null); // dapatkan koordinat [lintang, bujur]
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // control for bottom sheet modal
  const [polygon, setPolygon] = useState(null);
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [formData, setFormData] = useState({
    geofenceName: '',
    radius: '',
    startTime: '',
    endTime: '',
    shape: 'Lingkaran'
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

  const handleShapeChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      shape: value
    }));
    setPolygon(value === 'Poligon');
  };

  // Hapus poligon dari peta jika bentuk diubah menjadi Lingkaran
  useEffect(() => {
    if (formData.shape === 'Lingkaran' && polygon) {
      polygon.setMap(null); // Menghapus poligon dari peta
      setPolygon(null); // Mengosongkan state poligon
    }
  }, [formData.shape, polygon]);

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

  const { geofenceName, radius, startTime, endTime, shape } = formData;
  const transformedPolygonPoints = polygonPoints.map((point) => [point.lng, point.lat]);

  const newGeofence = {
    childId: childId,
    geofenceName: formData.geofenceName,
    startTime: formData.startTime,
    endTime: formData.endTime,
    shape: formData.shape === 'Lingkaran' ? 'circle' : 'polygon'
  };

  // Conditionally add the center field if shape is not "Poligon"
  if (formData.shape == 'Lingkaran') {
    newGeofence.center = [selectPosition?.lat, selectPosition?.lon];
    newGeofence.radius = formData.radius;
  }
  // Conditionally add the center field if shape is "Poligon"
  if (formData.shape == 'Poligon') {
    newGeofence.polygonPoints = transformedPolygonPoints;
  }

  // post data titik dan informasi geofencing
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check conditions for shape
    if (
      (formData.shape === 'Lingkaran' && !selectPosition) ||
      (formData.shape === 'Poligon' && polygonPoints.length === 0)
    ) {
      toast.error('Tambahkan area geofence terlebih dahulu');
      return;
    }

    // console.log(JSON.stringify(newGeofence, null, 2));

    try {
      await axios.post(process.env.REACT_APP_API_URL + 'geofence-schedule', newGeofence).then((res) => {
        toast.success(res.data.message);
        navigate(`/detailposisi/${childUsername}`, {
          state: { childId: childId }
        });
      });
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Terjadi kesalahan. Coba cek koneksi internet Anda.');
      }
    }
  };

  return (
    <GeofencePageLayout
      pageTitle="Tambah Geofence"
      user={user}
      selectPosition={selectPosition}
      setSelectPosition={setSelectPosition}
      showChildMarker={false}
      showGeofMarker={formData.shape === 'Lingkaran'}
      isMarkerDraggable={true}
      circleRadius={parseFloat(formData.radius) || 0}
      backBtnNavTo={`/detailposisi/${childUsername}`}
      backBtnState={{ childId: childId, childUsername: childUsername, childFullname: childFullname }}
      polygon={formData.shape === 'Poligon'}
      setPolygon={setPolygon}
      setPolygonPoints={setPolygonPoints}
    >
      {/* for small screen: show bottom sheet modal */}
      <BottomSheetModal id="bottom__sheet__modal" isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
        <AddGeoForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          handleShapeChange={handleShapeChange}
        />
      </BottomSheetModal>

      {/* for large screen: show floating box */}
      <div className="hidden lg:flex lg:flex-col lg:gap-1 absolute top-20 left-6">
        {/* searchbar start */}
        <div className="w-full lg:w-full flex items-center justify-center">
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
            handleShapeChange={handleShapeChange}
          />
        </div>
        {/* add geofencing form end */}

        {/* lang and long start (temporary)*/}
        {/* <div className="bg-red-200">
          <p>lat: {selectPosition?.lat}</p>
          <p>lon: {selectPosition?.lon}</p>
        </div> */}
        {/* lang and long end */}
      </div>
    </GeofencePageLayout>
  );
}

export default AddGeofencing;
