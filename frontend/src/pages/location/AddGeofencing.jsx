import { useState } from 'react';
import 'react-spring-bottom-sheet/dist/style.css';
import BottomSheetModal from '../../components/modals/BottomSheetModal';
import GeofencePageLayout from '../../layouts/geofencing/GeofencePageLayout';
import AddGeoForm from '../../components/inputs/AddGeoForm';
import MapsSearchBox from '../../components/maps/MapsSearchBox';

function AddGeofencing({ user }) {
  // const [open, setOpen] = useState(false);
  const [selectPosition, setSelectPosition] = useState(null);

  // control for bottom sheet modal
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <GeofencePageLayout
      pageTitle="Tambah Geofence"
      user={user}
      selectPosition={selectPosition}
      setSelectPosition={setSelectPosition}
    >
      {/* for small screen: show bottom sheet modal */}
      <BottomSheetModal id="bottom__sheet__modal" isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
        <AddGeoForm />
      </BottomSheetModal>

      {/* for large screen: show floating box */}
      <div className="hidden lg:flex lg:flex-col lg:gap-1 absolute top-20 left-6">
        {/* searchbar start */}
        <div className="w-full lg:w-[310px] flex items-center justify-center">
          <MapsSearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
        </div>
        {/* searchbar end */}

        {/* add geofencing form start */}
        <div className="bg-white rounded-xl py-0.5">
          <AddGeoForm />
        </div>
        {/* add geofencing form end */}
      </div>
    </GeofencePageLayout>
  );
}

export default AddGeofencing;
