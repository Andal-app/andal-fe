import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
        const response = await axios.get(process.env.REACT_APP_API_URL + `notification`);
        const filteredData = response.data.data.filter((notif) => notif.childUsername === 'hwangyeji');
        // console.log('Response received:', response.data); // Debug log
        const data = filteredData || [];
        setNotifData(Array.isArray(data) ? data : []);
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

        <main className="w-full">
          <ul id="notification__list__container">
            {notifData.map(({ _id, message, createdAt }) => (
              <NotifListView key={_id} title={message} detail="" dateTime={createdAt} />
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default NotificationPage;
