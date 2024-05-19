import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChildBox from '../../components/box/ChildBox';
import HomeLayout from '../../layouts/home/HomeLayout';

function ParentHomeV2({ user }) {
  const navigate = useNavigate();
  const [childrenData, setChildrenData] = useState([]);

  // const ChildrenList = [
  //   { fullName: 'Fiorenza Celestyn', profPic: '' },
  //   { fullName: 'Maura Yufi Septania', profPic: '' },
  //   { fullName: 'Isyana Sarawati', profPic: '' }
  // ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + 'parent/get-my-child');
        // console.log('Children list:', response.data.children);
        // console.log('Children msg:', response.data.message);
        setChildrenData(response.data.children);
        // console.log(childrenData);
      } catch (err) {
        console.error('Error fetching children list:', err);
      }
    };

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
          {childrenData?.map(({ id, username, fullname }) => (
            <ChildBox
              key={id}
              fullname={fullname}
              onClick={() => [
                navigate(`/detailposisi/${username}`, {
                  state: { childId: id, childUsername: username, childFullname: fullname }
                })
              ]}
              // to={{
              //   pathname: `/detailposisi/${username}`,
              //   state: { childId: id, childUsername: username, childFullname: fullname }
              // }}
            />
          ))}
        </div>
      </div>
      {/* children list end */}
    </HomeLayout>
  );
}

export default ParentHomeV2;
