import { useState } from 'react';
import 'react-spring-bottom-sheet/dist/style.css';
import BottomSheetModal from '../../components/modals/BottomSheetModal';
import ChildInfoBox from '../../components/box/ChildInfoBox';
import GeofencePageLayout from '../../layouts/geofencing/GeofencePageLayout';
import InputLabel from '../../components/inputs/InputLabel';
import TextInput from '../../components/inputs/TextInput';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import ResponsiveTimePicker from '../../components/inputs/ResponsiveTimePicker';

function AddGeofencing() {
  const [open, setOpen] = useState(false);

  const ScheduleData = [
    { location: 'SMPN 2 Temanggung', time: '8.00 - 13.00' },
    { location: 'TPA Nurul Amin', time: '18.00 - 19.00' }
  ];

  // control for bottom sheet modal
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // const handleOpenBottomSheet = () => {
  //   setIsBottomSheetOpen(true);
  // };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <GeofencePageLayout pageTitle="Tambah Geofence">
      {/* for small screen: show bottom sheet modal */}
      <BottomSheetModal id="bottom__sheet__modal" isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
        <form id="add__geofence__inputs" className="mx-8 my-4 flex flex-col gap-4">
          <div id="geonfece__name">
            <InputLabel labelFor="geonfenceName" content="Nama Geofence" className="font-bold" />
            <TextInput type="text" name="geofenceName" id="geofenceName" placeholder="SD Nusantara" required="true" />
          </div>

          <div>
            <InputLabel labelFor="geonfenceTime" content="Waktu" className="font-bold" />
            <ResponsiveTimePicker />
          </div>

          <div className="mt-6">
            <SubmitBtn type="submit" text="Tambah" />
          </div>
        </form>
      </BottomSheetModal>

      {/* for large screen: show floating box */}
      <div className="hidden lg:block absolute top-20 left-6 bg-white rounded-xl">
        <ChildInfoBox ScheduleData={ScheduleData} />
      </div>
    </GeofencePageLayout>
  );
}

export default AddGeofencing;
