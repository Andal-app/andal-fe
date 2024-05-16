import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import 'react-spring-bottom-sheet/dist/style.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { Icon } from '@iconify/react';
import 'react-spring-bottom-sheet/dist/style.css';
import BottomSheetModal from '../../components/modals/BottomSheetModal';
import ChildInfoBox from '../../components/box/ChildInfoBox';
import Sidebar from '../../components/navigation/Sidebar';
import Maps from '../../components/maps/Maps';
import IconBtn from '../../components/buttons/IconBtn';
import ScheduleData from '../../assets/dummy_data/schedule_geofence_yeji.json';

function PositionDetailV2({ user, selectPosition, setSelectPosition }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [childData, setChildData] = useState([]);

  const { childId } = location?.state || {}; // get current child info

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

  // control for bottom sheet modal
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // const handleOpenBottomSheet = () => {
  //   setIsBottomSheetOpen(true);
  // };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <div className="flex">
      <Sidebar user={user} />

      <main className="relative mx-0 flex flex-col gap-4 w-full">
        {/* top  nav start */}
        <nav className="absolute z-10 w-full lg:w-[310px] lg:left-6 top-4 lg:top-8 flex items-center justify-center">
          {/* circular back button start */}
          <div className="absolute left-3 flex justify-center items-center w-8 h-8 bg-violet-300 rounded-full text-black">
            <Icon icon={'ion:arrow-back'} className="w-6 h-6" />
          </div>
          {/* circular back button end */}

          <div
            id="page__title"
            className="min-w-32 max-w-fit px-4 h-9 text-b-md font-bold bg-violet-300 rounded-full flex justify-center items-center"
          >
            <p>Detail Posisi</p>
          </div>
        </nav>
        {/* top  nav end */}

        {/* map section start */}
        <div className="z-0 h-screen w-full flex justify-center items-center">
          <div className="w-full h-[100vh]">
            <Maps
              selectPosition={selectPosition ? selectPosition : null}
              setSelectPosition={setSelectPosition ? setSelectPosition : null}
              isMarkerDraggable={false}
            />
          </div>
        </div>
        {/* map section end */}

        {/* information detail modal start */}
        <div id="information__detail">
          {/* for small screen: show bottom sheet modal */}
          <BottomSheetModal id="bottom__sheet__modal" isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet}>
            <ChildInfoBox data={childData} />
          </BottomSheetModal>

          {/* for LARGE screen: show floating box start*/}
          <div className=" hidden lg:flex lg:flex-col lg:gap-2 lg:w-80 absolute top-20 left-6">
            <div className=" bg-white rounded-xl">
              <ChildInfoBox data={childData} />
            </div>

            {/* add and manage buttons start */}
            <div className="lg:flex gap-2">
              <div className="w-1/2 h-[40px]">
                <IconBtn
                  icon="tabler:plus"
                  text="Tambah jadwal"
                  onClick={() => [
                    navigate(`/tambahgeofence/${childData?.child?.username}`, {
                      state: {
                        childId: childData?.child?._id,
                        childUsername: childData?.child?.username,
                        childFullname: childData?.child?.fullname
                      }
                    })
                  ]}
                />
              </div>
              <div className="w-1/2 h-[40px]">
                <IconBtn
                  icon="bx:edit"
                  text="Kelola jadwal"
                  onClick={() => [
                    navigate(`/kelolajadwal/${childData?.child?.username}`, {
                      state: {
                        childId: childData?.child._id,
                        childUsername: childData?.child?.username,
                        childFullname: childData?.child?.fullname
                      }
                    })
                  ]}
                />
              </div>
            </div>
            {/*  add and manage buttons end */}
          </div>
          {/* for LARGE screen: show floating box end*/}
        </div>
        {/* information detail modal end */}

        {/* lang and long start (temporary)*/}
        {/* <div className="bg-red-200 absolute z-10 top-10 right-10">
          <p>lat: {selectPosition?.lat}</p>
          <p>lon: {selectPosition?.lon}</p>
        </div> */}
        {/* lang and long end */}
      </main>
    </div>
  );
}

export default PositionDetailV2;
