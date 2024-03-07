import React from 'react';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import LocationListView from '../../components/listViews/LocationListView';

function GeofSchedule() {
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
      <Sidebar />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
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
      </div>
    </div>
  );
}

export default GeofSchedule;
