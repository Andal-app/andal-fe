import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChildBox from '../../components/box/ChildBox';
import HomeLayout from '../../layouts/home/HomeLayout';
import { requestNotificationPermission, registerServiceWorker } from '../../utils/notificationUtils';
import User01aSvg from '../../assets/dummy_data/user_01a.svg';
import User01bSvg from '../../assets/dummy_data/user_01b.svg';
import User04bSvg from '../../assets/dummy_data/user_04b.svg';
import User06aSvg from '../../assets/dummy_data/user_06a.svg';
import User06cSvg from '../../assets/dummy_data/user_06c.svg';

const ChildrenPicDummy = [User01aSvg, User01bSvg, User04bSvg, User06aSvg, User06cSvg];

function ParentHomeV2({ user }) {
  const navigate = useNavigate();
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
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    requestNotificationPermission();
    registerServiceWorker().then(() => {
      // Optional: Test push notification
      // showTestNotification();
    });
    fetchData();

    return () => {};
  }, []);

  return (
    <HomeLayout user={user}>
      <div className="mx-6 lg:mx-12 lg:mt-4">
        {/* page title start */}
        <h5 className="text-h-sm font-bold pb-6 text-violet-900">Daftar Anak</h5>
        {/* page title end */}

        {/* children list start */}
        <div className="flex lg:flex-col flex-wrap lg:flex-nowrap w-full justify-between gap-2 lg:gap-4">
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
            childrenData?.map(({ id, username, fullname }, index) => (
              <ChildBox
                key={id}
                fullname={fullname}
                profPic={ChildrenPicDummy[index % ChildrenPicDummy.length]}
                onClick={() => [
                  navigate(`/detailposisi/${username}`, {
                    state: { childId: id, childUsername: username, childFullname: fullname }
                  })
                ]}
              />
            ))
          )}
        </div>
      </div>
      {/* children list end */}
    </HomeLayout>
  );
}

export default ParentHomeV2;
