import { useState } from 'react';
import 'react-spring-bottom-sheet/dist/style.css';
import BottomSheetModal from '../../components/modals/BottomSheetModal';
import GeofencePageLayout from '../../layouts/geofencing/GeofencePageLayout';
import AddGeoForm from '../../components/inputs/AddGeoForm';

function AddGeofencing({ user }) {
  const [open, setOpen] = useState(false);

  // control for bottom sheet modal
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <GeofencePageLayout pageTitle="Tambah Geofence" user={user}>
      {/* for small screen: show bottom sheet modal */}
      <BottomSheetModal id="bottom__sheet__modal" isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
        <AddGeoForm />
      </BottomSheetModal>

      {/* for large screen: show floating box */}
      <div className="hidden lg:block absolute top-20 left-6 bg-white rounded-xl">
        <AddGeoForm />
      </div>
    </GeofencePageLayout>
  );
}

export default AddGeofencing;
