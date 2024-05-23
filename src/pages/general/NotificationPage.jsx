import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { App, Credentials } from 'realm-web';
import { formatDateTimeWIB } from '../../utils/dateTimeUtils';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import NotifListView from '../../components/listViews/NotifListView';
import BottomNavbar from '../../components/navigation/BottomNavbar';

// const REALM_APP_ID = process.env.REACT_APP_REALM_APP_ID;
const app = new App({ id: 'application-0-pzubklv' });

function NotificationPage({ user }) {
  const [notifData, setNotifData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    const fetchNotifications = async (childUsernames) => {
      try {
        const credentials = Credentials.anonymous();
        const user = await app.logIn(credentials);
        const mongodb = app.currentUser.mongoClient('mongodb-atlas');
        const notificationsCollection = mongodb.db('childtrackr-new').collection('notifications');

        // Fetch initial data filtered by childUsername
        const initialData = await notificationsCollection.find(
          { childUsername: { $in: childUsernames } },
          { sort: { createdAt: -1 } }
        );
        setNotifData(initialData);

        // Watch for changes in the notifications collection
        for await (const change of notificationsCollection.watch()) {
          if (change.operationType === 'insert' && childUsernames.includes(change.fullDocument.childUsername)) {
            setNotifData((prevData) => [change.fullDocument, ...prevData]);
          }
        }
      } catch (err) {
        setError('Failed to connect to the database.');
        console.error(err);
      }
    };

    const initializeNotifications = async () => {
      const childUsernames = await fetchChildUsernames();
      if (childUsernames.length > 0) {
        await fetchNotifications(childUsernames);
      } else {
        setError('No child usernames found.');
      }
    };

    initializeNotifications();

    return () => {
      app.currentUser?.logOut();
    };
  }, []);

  return (
    <div className="flex">
      <Sidebar user={user} />
      <BottomNavbar />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        <TopBackNav navigateTo="/beranda/orangtua" title="Riwayat Notifikasi" />

        <main className="w-full overflow-auto lg:scrollbar scrollbar-thumb-neutral-300 scrollbar-track-neutral-100 scrollbar-thumb-rounded-full">
          <ul id="notification__list__container">
            {error ? (
              <p className="text-black text-center text-b-md">{error}</p>
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
