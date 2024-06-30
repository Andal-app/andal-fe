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
import { useNavigate } from 'react-router-dom';

const ConnectAccount = ({ user }) => {
  const [isCodeModalOpen, setCodeModalOpen] = useState(false);
  const [childId, setChildId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/orangtua/hubungkan/scan');
  };

  return (
    <div className="flex">
      <Sidebar user={user} />
      <BottomNavbar user={user} />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300 gap-16 lg:gap-0">
        {/* page title start */}
        <TopBackNav title="Hubungkan Akun Anak" navigateTo="/beranda/orangtua" />
        {/* page title end */}

        {/* hubungkan start */}
        <div id="user__profile" className={`w-[85%] lg:w-1/2 h-screen flex flex-col items-center gap-4 py-6`}>
          {/* masukkan username anak start */}
          <form id="insert__child__username" onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
            <div className="space-y-4">
              {/* title start */}
              <div className="text-center space-y-4">
                <p className="font-bold text-h-md text-violet-900">Pindai QR Code Anak</p>
                <p className="text-b-md text-black">
                  Anda perlu memindai QR Code pada akun anak untuk dapat menghubungkan akun anak
                </p>
              </div>
              {/* title end */}

              {/* tutorial box start */}
              <div id="tutorial">
                <div className="w-full bg-white rounded-xl drop-shadow-xl px-12 py-6">
                  <ul className="list-disc text-b-md">
                    <li>Masuk ke akun anak</li>
                    <li>Buka menu ‘Hubungkan’</li>
                    <li>Pindai QR Code pada akun anak</li>
                  </ul>
                </div>
              </div>
              {/* tutorial box end */}
            </div>

            <div>
              <SubmitBtn text="Mulai Pindai" />
            </div>
          </form>
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

export default ConnectAccount;
