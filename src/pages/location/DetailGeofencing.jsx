import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import 'react-spring-bottom-sheet/dist/style.css';
import BottomSheetModal from '../../components/modals/BottomSheetModal';
import GeofencePageLayout from '../../layouts/geofencing/GeofencePageLayout';
import DetailGeoForm from '../../components/inputs/DetailGeoForm';

function DetailGeofencing({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { childId, geofenceId } = location?.state || {}; // get current child info
  const { childUsername } = useParams();
  // console.log('childID: ' + childId);
  const [geofenceData, setGeofenceData] = useState([]);

  const [selectPosition, setSelectPosition] = useState(null); // dapatkan koordinat [lintang, bujur]
  const [polygonPoints, setPolygonPoints] = useState([]);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false); // control for bottom sheet modal

  // console.log('geofenceID: ' + geofenceId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}geofence-schedule/${geofenceId}`);

        const { geofence } = response.data;

        setGeofenceData(geofence);

        if (geofence.shape === 'circle') {
          const { center, radius } = geofence;
          setSelectPosition({
            lat: center[0],
            lon: center[1]
          });
        } else if (geofence.shape === 'polygon') {
          const { polygonPoints } = geofence;
          setPolygonPoints(polygonPoints.map((point) => ({ lat: point[1], lng: point[0] })));
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

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <GeofencePageLayout
      pageTitle="Detail Geofence"
      user={user}
      selectPosition={selectPosition}
      setSelectPosition={setSelectPosition}
      showChildMarker={false}
      showGeofMarker={true}
      circleRadius={geofenceData?.radius}
      isMarkerDraggable={false}
      backBtnNavTo={`/kelolajadwal/${childUsername}`}
      backBtnState={{ childId: childId, childUsername: childUsername }}
      polygon={geofenceData.shape === 'polygon'}
      polygonPoints={polygonPoints}
    >
      {/* for small screen: show bottom sheet modal */}
      <BottomSheetModal id="bottom__sheet__modal" isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
        <DetailGeoForm
          childId={childId}
          geofenceId={geofenceData?._id}
          geofenceName={geofenceData?.geofenceName}
          geofenceShape={geofenceData?.shape === 'circle' ? 'Lingkaran' : 'Poligon'}
          startTime={geofenceData?.startTime}
          endTime={geofenceData?.endTime}
          radius={geofenceData?.radius}
        />
      </BottomSheetModal>

      {/* for large screen: show floating box */}
      <div className="hidden lg:flex lg:flex-col lg:gap-1 absolute top-20 left-6">
        {/* add geofencing form start */}
        <div className="bg-white rounded-xl py-0.5">
          <DetailGeoForm
            childId={childId}
            geofenceId={geofenceData?._id}
            geofenceName={geofenceData?.geofenceName}
            geofenceShape={geofenceData?.shape === 'circle' ? 'Lingkaran' : 'Poligon'}
            startTime={geofenceData?.startTime}
            endTime={geofenceData?.endTime}
            radius={geofenceData?.radius}
          />
        </div>
        {/* add geofencing form end */}

        {/* lang and long start (temporary)*/}
        {/* <div className="bg-red-200">
          <p>lat: {geofenceData?.location?.coordinates[0]}</p>
          <p>lon: {geofenceData?.location?.coordinates[1]}</p>
        </div> */}
        {/* lang and long end */}
      </div>
    </GeofencePageLayout>
  );
}

export default DetailGeofencing;
