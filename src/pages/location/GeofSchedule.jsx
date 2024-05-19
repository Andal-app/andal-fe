import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Icon } from '@iconify/react';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import LocationListView from '../../components/listViews/LocationListView';

function GeofSchedule({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { childId } = location?.state || {}; // get current child info
  const [childData, setChildData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `child/${childId}`);
        setChildData(response.data);
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Terjadi kesalahan. Coba cek koneksi internet Anda.');
        }
      }
    };

    fetchData();

    return () => {};
  }, []);

  return (
    <div className="flex">
      <Sidebar user={user} />

      <div className="relative w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        {/* top back nav start */}
        <TopBackNav title="Jadwal dan Titik Geofencing" />
        {/* top back nav end */}

        <main className="w-full">
          <ul id="notification__list__container">
            {childData?.geofences?.map(({ geofenceName, startTime, endTime, _id }) => (
              <LocationListView
                key={_id}
                geofenceId={_id}
                geofenceName={geofenceName}
                startTime={startTime}
                endTime={endTime}
                childId={childData?.child?._id}
                childUsername={childData?.child?.username}
              />
            ))}
          </ul>
        </main>

        {/* add button start */}
        <div className="h-[50px] absolute z-10 right-8 bottom-12">
          <button
            onClick={() => [
              navigate(`/tambahgeofence/${childData?.child?.username}`, {
                state: {
                  childId: childData?.child?._id,
                  childUsername: childData?.child?.username,
                  childFullname: childData?.child?.fullname
                }
              })
            ]}
            className="w-full h-full px-2 flex items-center justify-center gap-1 bg-violet-500 text-white rounded-md"
          >
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
