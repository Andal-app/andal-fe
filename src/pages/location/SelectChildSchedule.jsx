import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import ChildBox from '../../components/box/ChildBox';

function SelectChildSchedule({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { childId } = location?.state || {}; // get current child info
  const [childrenData, setChildrenData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + 'parent/get-my-child');
        setChildrenData(response.data.children);
      } catch (err) {
        console.error('Error fetching children list:', err);
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

        <main className="w-full  px-10 py-4">
          {childrenData?.map(({ id, username, fullname }) => (
            <ChildBox
              key={id}
              fullname={fullname}
              onClick={() => [
                navigate(`/kelolajadwal/${username}`, {
                  state: { childId: id, childUsername: username, childFullname: fullname }
                })
              ]}
              // to={{
              //   pathname: `/detailposisi/${username}`,
              //   state: { childId: id, childUsername: username, childFullname: fullname }
              // }}
            />
          ))}
        </main>
      </div>
    </div>
  );
}

export default SelectChildSchedule;
