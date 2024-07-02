import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import TextInput from '../../components/inputs/TextInput';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import ProfPic from '../../assets/images/profile_picture.jpeg';
import ShowConnectCodeModal from '../../components/connect/ShowConnectCodeModal';
import BottomNavbar from '../../components/navigation/BottomNavbar';
import CodeInput from '../../components/inputs/CodeInput';
import { useLocation, useNavigate } from 'react-router-dom';
import ShowConnectCode from '../../components/connect/ShowConnectCode/ShowConnectCode';

const ShowParentCode = ({ user }) => {
  const [isCodeModalOpen, setCodeModalOpen] = useState(false);
  const [childId, setChildId] = useState('');
  const [otp, setOtp] = useState('');
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.code) {
      setOtp(state.code);
    }
  }, [state]);

  const handleClick = async (e) => {
    e.preventDefault();
    navigate('/orangtua/hubungkan');
  };

  return (
    <div className="flex">
      <Sidebar user={user} />
      <BottomNavbar user={user} />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        {/* page title start */}
        <TopBackNav title="Hubungkan Akun Anak" navigateTo="/beranda/orangtua" />
        {/* page title end */}

        {/* hubungkan start */}
        <div id="otp__container" className={`w-[85%] lg:w-1/2 h-screen flex flex-col items-center gap-12 py-12`}>
          {/* masukkan username anak start */}
          <div id="show__otp" className="w-full flex flex-col gap-8">
            <ShowConnectCode verifCode={otp} subtitle="Masukkan kode pada akun anak" />
          </div>

          <div>Kode berlaku selama "hitung mundur"</div>

          <div className="w-full">
            <SubmitBtn
              text="Pindai Ulang QR Code"
              onClick={handleClick}
              bgColor="bg-yellow-700"
              bgColorHover="bg-yellow-800"
            />
          </div>
        </div>
        {/* hubungkan end */}
      </div>
      {/* 
  <div>
    <BottomNavbar className="h-screen flex justify-center items-center bg-gray-900" />
  </div> */}
    </div>
  );
};

export default ShowParentCode;
