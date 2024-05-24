import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import ChildBox from '../../components/box/ChildBox';
import BottomNavbar from '../../components/navigation/BottomNavbar';

function SelectChildSchedule({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { childId } = location?.state || {}; // get current child info
  const [childrenData, setChildrenData] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + 'parent/get-my-child');
        setChildrenData(response.data.children);
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

    fetchData();

    return () => {};
  }, []);

  return (
    <div className="flex">
      <Sidebar user={user} />

      <div className="relative w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        {/* top back nav start */}
        <TopBackNav navigateTo="/beranda/orangtua" title="Jadwal dan Titik Geofencing" />
        {/* top back nav end */}

        <main className="px-10 py-4 flex lg:flex-col flex-wrap lg:flex-nowrap w-full justify-between gap-2 lg:gap-4">
          {error ? (
            <p className="text-black text-center text-b-md">{error}</p>
          ) : isLoading ? (
            <div className="space-y-2">
              <div className="h-36 lg:h-24 w-[48%] lg:w-fit lg:min-w-72 animate-pulse bg-neutral-100 rounded-xl"></div>
              <div className="h-36 lg:h-24 w-[48%] lg:w-fit lg:min-w-72 animate-pulse bg-neutral-100 rounded-xl"></div>
            </div>
          ) : childrenData === 0 ? (
            <p className="text-black text-center text-b-md">Tambahkan data baru</p>
          ) : (
            childrenData?.map(({ id, username, fullname }) => (
              <ChildBox
                key={id}
                fullname={fullname}
                onClick={() => [
                  navigate(`/kelolajadwal/${username}`, {
                    state: { childId: id, childUsername: username, childFullname: fullname }
                  })
                ]}
              />
            ))
          )}
        </main>
      </div>

      <BottomNavbar user={user} />
    </div>
  );
}

export default SelectChildSchedule;
