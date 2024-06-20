import React from 'react';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import BottomNavbar from '../../components/navigation/BottomNavbar';
import ShowConnectCode from '../../components/connect/ShowConnectCode/ShowConnectCode';
import { useNavigate } from 'react-router-dom';

const ShowChildCode = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/anak/hubungkan/masukkankode');
  };

  return (
    <div className="flex">
      <Sidebar user={user} />
      <BottomNavbar user={user} />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        {/* page title start */}
        <TopBackNav title="Hubungkan Akun Orang Tua" navigateTo="/beranda/anak" />
        {/* page title end */}

        {/* show code start */}
        <div className="w-[85%] lg:w-1/2 py-8 space-y-8">
          <ShowConnectCode
            verifCode="ABCDE"
            subtitle="Masukkan kode pada akun orang tua"
            bgColor="bg-violet-100"
            textColor="text-violet-900"
            borderColor="border-violet-300"
          />
          <SubmitBtn text="Lanjut" onClick={handleClick} />
        </div>
        {/* show code end */}
      </div>
      {/* 
  <div>
    <BottomNavbar className="h-screen flex justify-center items-center bg-gray-900" />
  </div> */}
    </div>
  );
};

export default ShowChildCode;
