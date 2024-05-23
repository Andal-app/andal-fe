import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDateTimeWIB } from '../../utils/dateTimeUtils';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import NotifListView from '../../components/listViews/NotifListView';
import BottomNavbar from '../../components/navigation/BottomNavbar';

function NotificationPage({ user }) {
  const [notifData, setNotifData] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  // const { childId } = location?.state || {}; // get current child info

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}notification/?parentId=${user?.parentId}`);
        setNotifData(response.data.data);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message);
        } else {
          setError('Terjadi kesalahan. Coba cek koneksi internet Anda.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex">
      <Sidebar user={user} />
      <BottomNavbar />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        {/* top back nav start */}
        <TopBackNav navigateTo="/beranda/orangtua" title="Riwayat Notifikasi" />
        {/* top back nav end */}

        <main className="w-full overflow-auto lg:scrollbar scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 scrollbar-thumb-rounded-full">
          <ul id="notification__list__container" className="">
            {error ? (
              <p className="text-black text-center text-b-md">{error}</p>
            ) : (
              // : isLoading ? (
              //   <div className="space-y-1">
              //     <div className="h-14 lg:h-[70px] w-full animate-pulse bg-neutral-100"></div>
              //     <div className="h-14 lg:h-[70px] w-full animate-pulse bg-neutral-100"></div>
              //     <div className="h-14 lg:h-[70px] w-full animate-pulse bg-neutral-100"></div>
              //   </div>
              // )
              // notifData?.length === 0 ? (
              //   <p className="text-black text-center text-b-md">Belum ada notifikasi</p>
              // ) :
              notifData.map(({ _id, message, createdAt }) => (
                <NotifListView key={_id} title={message} detail="" dateTime={formatDateTimeWIB(createdAt)} />
              ))
            )}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default NotificationPage;
