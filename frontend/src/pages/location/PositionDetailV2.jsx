import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useBottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { Icon } from '@iconify/react';
import Sidebar from '../../components/navigation/Sidebar';
import PositionDetailBox from '../../components/box/PositionDetailBox';
import ScheduleItem from '../../components/box/ScheduleItem';
import BottomSheetModal from '../../components/modals/BottomSheetModal';
import ChildInfoBox from '../../components/box/ChildInfoBox';

function PositionDetailV2() {
  const [open, setOpen] = useState(false);

  const ScheduleData = [
    { location: 'SMPN 2 Temanggung', time: '8.00 - 13.00' },
    { location: 'TPA Nurul Amin', time: '18.00 - 19.00' }
  ];

  // control for bottom sheet modal
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <div className="flex bg-red-100">
      <Sidebar />

      <div className="relative mx-0 flex flex-col gap-4 w-full">
        {/* top  nav start */}
        <nav className="bg-red-200 absolute z-10 w-full lg:w-[340px] lg:ml-8 mt-4 flex items-center justify-center">
          {/* circular back button start */}
          <div className="absolute left-3 flex justify-center items-center w-8 h-8 bg-violet-300 rounded-full text-black">
            <Icon icon={'ion:arrow-back'} className="w-6 h-6" />
          </div>
          {/* circular back button end */}

          <div
            id="page__title"
            className="w-32 h-9 text-b-lg font-bold bg-violet-300 rounded-full flex justify-center items-center"
          >
            <p>Detail Posisi</p>
          </div>
        </nav>
        {/* top  nav end */}

        {/* map start */}
        <div className="z-0 bg-neutral-400 h-screen w-full">MAP MAP MAP MAP MAP MAP</div>
        {/* map end */}

        {/* information detail modal start */}
        {/* for small screen */}
        <BottomSheetModal id="bottom__sheet__modal" isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
          <ChildInfoBox ScheduleData={ScheduleData} />
        </BottomSheetModal>

        {/* for large screen */}
        <div className="hidden lg:block absolute top-20 left-6 bg-white rounded-xl">
          <ChildInfoBox ScheduleData={ScheduleData} />
        </div>
        {/* information detail modal end */}
      </div>
    </div>
  );
}

export default PositionDetailV2;
