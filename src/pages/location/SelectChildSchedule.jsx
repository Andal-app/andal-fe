import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import ChildBox from '../../components/box/ChildBox';
import BottomNavbar from '../../components/navigation/BottomNavbar';
import User01aSvg from '../../assets/dummy_data/user_01a.svg';
import User01bSvg from '../../assets/dummy_data/user_01b.svg';
import User04bSvg from '../../assets/dummy_data/user_04b.svg';
import User06aSvg from '../../assets/dummy_data/user_06a.svg';
import User06cSvg from '../../assets/dummy_data/user_06c.svg';

const ChildrenPicDummy = [User01aSvg, User01bSvg, User04bSvg, User06aSvg, User06cSvg];

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
            childrenData?.map(({ _id, username, fullname, profilePicture }, index) => (
              <ChildBox
                key={_id}
                fullname={fullname}
                // profPic={ChildrenPicDummy[index % ChildrenPicDummy.length]}
                profPic={profilePicture}
                onClick={() => [
                  navigate(`/kelolajadwal/${username}`, {
                    state: { childId: _id, childUsername: username, childFullname: fullname }
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
