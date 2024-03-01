import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { Icon } from '@iconify/react';
import Sidebar from '../../components/navigation/Sidebar';

function PositionDetailV2() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar />

      <div className="relative mx-4 lg:mx-0 flex flex-col gap-4 w-full">
        {/* top  nav start */}
        <nav className="mt-4 flex items-center justify-center bg-red-100">
          {/* circular back button start */}
          <span className="left-0 absolute flex justify-center items-center w-8 h-8 bg-violet-300 rounded-full text-black">
            <Icon icon={'ion:arrow-back'} className="w-6 h-6" />
          </span>
          {/* circular back button end */}

          <div className="w-32 h-9 text-b-lg font-bold bg-violet-300 rounded-full flex justify-center items-center">
            <p>Detail Posisi</p>
          </div>
        </nav>
        {/* top  nav end */}

        {/* map start */}
        <div className="z-0 bg-neutral-400 h-full w-full">MAP MAP MAP MAP MAP MAP</div>
        {/* map end */}

        {/* information detail start */}
        <div className="bg-red-200">
          <div className="bg-violet-300">
            <p>Maura berada di Fakultas Teknik</p>
            <div className="flex gap-2">
              <p>08.00</p>
              <p>WIB</p>
            </div>
          </div>
          <div>Detail Posisi</div>
          <div>Status</div>
          <div>Jadwal</div>
        </div>
        {/* information detail end */}
      </div>
    </div>
  );
}

export default PositionDetailV2;
