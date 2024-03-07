import React from 'react';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import NotifListView from '../../components/listViews/NotifListView';

function NotificationPage() {
  const NotifData = [
    {
      title: 'Maura keluar dari area SMPN 2 Temanggung',
      detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
      dateTime: 'Rabu, 3 Januari 2023 12:52 WIB'
    },
    {
      title: 'Maura keluar dari area TPA Nurul Imane',
      detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempore',
      dateTime: 'Rabu, 3 Januari 2023 17:50 WIB'
    }
  ];

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        {/* top back nav start */}
        <TopBackNav title="Riwayat Notifikasi" />
        {/* top back nav end */}

        <main className="w-full">
          <ul id="notification__list__container">
            {NotifData.map(({ index, title, detail, dateTime }) => (
              <NotifListView index={index} title={title} detail={detail} dateTime={dateTime} />
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default NotificationPage;
