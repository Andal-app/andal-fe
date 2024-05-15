import React from 'react';
import { Icon } from '@iconify/react';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import LocationListView from '../../components/listViews/LocationListView';

function GeofSchedule({ user }) {
  const ScheduleData = [
    {
      location: 'SMPN 2 Temanggung',
      time: '8:00-13:00'
    },
    {
      location: 'TPA Nurul Amin',
      time: '17:00-19:00'
    }
  ];

  return (
    <div className="flex">
      <Sidebar user={user} />

      <div className="relative w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        {/* top back nav start */}
        <TopBackNav title="Jadwal dan Titik Geofencing" />
        {/* top back nav end */}

        <main className="w-full">
          <ul id="notification__list__container">
            {ScheduleData.map(({ location, time }) => (
              <LocationListView location={location} time={time} />
            ))}
          </ul>
        </main>

        {/* add button start */}
        <div className="h-[50px] absolute z-10 right-8 bottom-12">
          <button className="w-full h-full px-2 flex items-center justify-center gap-1 bg-violet-500 text-white rounded-md">
            <div>
              <Icon icon="vaadin:plus" className="w-6 h-6" />
            </div>
            <p className="text-b-md font-semibold">Tambah jadwal baru</p>
          </button>
        </div>
        {/* add button end */}
      </div>
    </div>
  );
}

export default GeofSchedule;
