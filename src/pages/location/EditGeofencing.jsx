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
    if (value === 'Lingkaran') {
      setPolygon(false);
    } else if (value === 'Poligon') {
      setPolygon(true);
    }
  };

  // Hapus poligon dari peta jika bentuk diubah menjadi Lingkaran
  useEffect(() => {
    if (formData.shape === 'Lingkaran' && polygon) {
      if (polygon.setMap) {
        polygon.setMap(null); // Menghapus poligon dari peta jika ada
      }
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `geofence-schedule/${geofenceId}`);

        setGeofenceData(response.data.geofence);

        const initialFormData = {
          geofenceName: response.data.geofence.geofenceName,
          startTime: response.data.geofence.startTime,
          endTime: response.data.geofence.endTime,
          shape: response.data.geofence.shape === 'polygon' ? 'Poligon' : 'Lingkaran'
          // radius: response.data.geofence.shape === 'circle' ? response.data.geofence.radius.toString() : ''
        };

        setFormData(initialFormData);

        if (response.data.geofence.shape === 'circle') {
          const { center, radius } = response.data.geofence;
          setSelectPosition({
            lat: center[0],
            lon: center[1]
          });
          initialFormData.radius = radius.toString();
        } else if (response.data.geofence.shape === 'polygon') {
          const { polygonPoints } = response.data.geofence;
          setPolygonPoints(polygonPoints.map((point) => ({ lat: point[1], lng: point[0] })));
          setPolygon(true);

          handleShapeChange('Poligon');
        }
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
  }, [geofenceId]);

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

    // Prepare geofence data based on shape
    const updatedGeofence = {
      childId: childId,
      geofenceName: formData.geofenceName,
      startTime: formData.startTime,
      endTime: formData.endTime,
      shape: formData.shape === 'Lingkaran' ? 'circle' : 'polygon'
    };

    // Conditionally add the center field if shape is not "Poligon"
    if (formData.shape === 'Lingkaran') {
      updatedGeofence.center = [selectPosition?.lat, selectPosition?.lon];
      updatedGeofence.radius = formData.radius;
    }

    // Conditionally add the center field if shape is "Poligon"
    if (formData.shape === 'Poligon') {
      updatedGeofence.polygonPoints = polygonPoints.map((point) => [point.lng, point.lat]);
    }

    // console.log(JSON.stringify(updatedGeofence, null, 2));

    try {
      await axios
        .patch(`${process.env.REACT_APP_API_URL}geofence-schedule/${geofenceId}`, updatedGeofence)
        .then((res) => {
          toast.success(res.data.message);
          navigate(`/detailgeofence/${geofenceId}`, {
            state: { childId: childId, geofenceId: geofenceId }
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
      pageTitle="Edit Geofence"
      user={user}
      selectPosition={selectPosition}
      setSelectPosition={setSelectPosition}
      showChildMarker={false}
      showGeofMarker={formData.shape === 'Lingkaran'}
      isMarkerDraggable={true}
      circleRadius={parseFloat(formData.radius) || 0}
      backBtnNavTo={`/detailgeofence/${geofenceId}`}
      backBtnState={{ geofenceId: `${geofenceId}` }}
      polygon={formData.shape === 'Poligon'}
      setPolygon={setPolygon}
      setPolygonPoints={setPolygonPoints}
      polygonPoints={polygonPoints}
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
          handleShapeChange={handleShapeChange}
        />
      </BottomSheetModal>

      {/* for large screen: show floating box */}
      <div className="hidden lg:flex lg:flex-col lg:gap-1 absolute top-20 left-6">
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

export default EditGeofencing;
