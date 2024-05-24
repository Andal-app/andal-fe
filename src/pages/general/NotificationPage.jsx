import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { App, Credentials } from 'realm-web';
import { formatDateTimeWIB } from '../../utils/dateTimeUtils';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import NotifListView from '../../components/listViews/NotifListView';
import BottomNavbar from '../../components/navigation/BottomNavbar';
import { requestNotificationPermission, registerServiceWorker, showNotification } from '../../utils/notificationUtils';

const app = new App({ id: process.env.REACT_APP_REALM_APP_ID });

function NotificationPage({ user }) {
  const [notifData, setNotifData] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialNotifications = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}notification/?parentId=${user?.parentId}`);
        const sortedData = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNotifData(sortedData);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message);
          // toast.error(err.response.data.message);
        } else {
          setError('Terjadi kesalahan. Coba cek koneksi internet Anda.');
          // toast.error('Terjadi kesalahan. Coba cek koneksi internet Anda.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    const fetchChildUsernames = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + 'parent/get-my-child');
        const children = response.data.children;
        return children.map((child) => child.username);
      } catch (err) {
        console.error('Failed to fetch child usernames:', err);
        return [];
      }
    };

    const watchNotifications = async (childUsernames) => {
      try {
        const credentials = Credentials.anonymous();
        const user = await app.logIn(credentials);
        const mongodb = app.currentUser.mongoClient('mongodb-atlas');
        const notificationsCollection = mongodb.db('childtrackr-new').collection('notifications');

        // Watch for changes in the notifications collection
        for await (const change of notificationsCollection.watch()) {
          if (change.operationType === 'insert' && childUsernames.includes(change.fullDocument.childUsername)) {
            setNotifData((prevData) => [change.fullDocument, ...prevData]);
            showNotification('New Notification', {
              body: change.fullDocument.message,
              icon: '/icon.png',
              badge: '/badge.png'
            });
          }
        }
      } catch (err) {
        setError('Failed to connect to the database.');
        console.error(err);
      }
    };

    const initializeNotifications = async () => {
      await requestNotificationPermission();
      const registration = await registerServiceWorker();
      if (registration) {
        await fetchInitialNotifications();
        const childUsernames = await fetchChildUsernames();
        if (childUsernames.length > 0) {
          await watchNotifications(childUsernames);
        } else {
          setError('No child usernames found.');
        }
      }
    };

    initializeNotifications();

    return () => {
      app.currentUser?.logOut();
    };
  }, [user?.parentId]);

  return (
    <div className="flex">
      <Sidebar user={user} />
      <BottomNavbar user={user} />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        <TopBackNav navigateTo="/beranda/orangtua" title="Riwayat Notifikasi" />

        <main className="w-full overflow-auto lg:scrollbar scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 scrollbar-thumb-rounded-full">
          <ul id="notification__list__container">
            {error ? (
              <p className="text-black text-center text-b-md">{error}</p>
            ) : isLoading ? (
              <div className="space-y-1">
                <div className="h-14 lg:h-[70px] w-full animate-pulse bg-neutral-100"></div>
                <div className="h-14 lg:h-[70px] w-full animate-pulse bg-neutral-100"></div>
                <div className="h-14 lg:h-[70px] w-full animate-pulse bg-neutral-100"></div>
              </div>
            ) : notifData.length === 0 ? (
              <p className="text-black text-center text-b-md">...</p>
            ) : (
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
