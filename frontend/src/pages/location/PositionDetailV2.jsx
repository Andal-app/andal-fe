import { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useBottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { Icon } from '@iconify/react';
import Sidebar from '../../components/navigation/Sidebar';
import PositionDetailBox from '../../components/box/PositionDetailBox';
import ScheduleItem from '../../components/box/ScheduleItem';

function PositionDetailV2() {
  const [open, setOpen] = useState(false);

  const ScheduleData = [
    { location: 'SMPN 2 Temanggung', time: '8.00 - 13.00' },
    { location: 'TPA Nurul Amin', time: '18.00 - 19.00' }
  ];

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

        {/* information detail modal start */}
        <div className="bg-red-200 m-4 flex flex-col gap-2">
          <div className="bg-violet-300 p-3 text-violet-900 rounded-xl border border-violet-500">
            <div id="latest__location" className="flex">
              <p className="text-b-xl font-medium">Maura berada di &nbsp;</p>
              <p className="text-b-xl font-medium">Fakultas Teknik</p>
            </div>

            <div id="latest__time" className="flex gap-2">
              <p>08.00</p>
              <p>WIB</p>
            </div>
          </div>

          <div id="location__detail">
            <PositionDetailBox />
          </div>

          {/* status start */}
          <div id="status" className="text-b-md">
            <div id="location__status" className="flex gap-2">
              <p className="font-bold text-violet-900">Status:</p>
              <p>Berada dalam geofence sesuai jadwal</p>
            </div>

            {/* battery and gps status start */}
            <div id="battery__gps__status" className="flex gap-4">
              {/* battery status start */}
              <div id="battery__status" className="flex gap-2 text-b-lg">
                <p className="text-violet-900 font-bold">kotak</p>
                <p>
                  100<span>%</span>
                </p>
              </div>
              {/* battery status end */}

              {/* gps status start */}
              <div id="gps__status" className="flex gap-2 text-b-lg">
                <p className="text-violet-900 font-bold">GPS</p>
                <p>Aktif</p>
              </div>
              {/* gps status end */}
            </div>
            {/* battery and gps status end */}
          </div>
          {/* status end */}

          {/* schedule box start */}
          <div className="flex flex-col gap-2">
            <p className="text-b-lg font-bold text-violet-900">Jadwal</p>

            {/* schedule items start */}
            <ul className="flex flex-col gap-2">
              {ScheduleData.map(({ location, time, index }) => (
                <ScheduleItem location={location} time={time} index={index} />
              ))}
            </ul>
            {/* schedule items end */}
          </div>
          {/* schedule box end */}
        </div>
        {/* information detail modal end */}
      </div>
    </div>
  );
}

export default PositionDetailV2;
