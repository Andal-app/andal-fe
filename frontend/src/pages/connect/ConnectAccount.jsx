import React, { useState } from 'react';
import SubmitBtn from '../../components/buttons/SubmitBtn';
import TextInput from '../../components/inputs/TextInput';
import Sidebar from '../../components/navigation/Sidebar';
import TopBackNav from '../../components/navigation/TopBackNav';
import ProfPic from '../../assets/images/profile_picture.jpeg';
import ShowConnectCode from '../../components/connect/ShowConnectCode';

const ConnectAccount = ({ user }) => {
  const [isCodeModalOpen, setCodeModalOpen] = useState(false);

  const toggleCodeModal = () => {
    setCodeModalOpen(!isCodeModalOpen);
  };
  return (
    <div className="flex">
      <Sidebar user={user} />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        {/* page title start */}
        <TopBackNav title="Hubungkan Akun Anak" link="/beranda/orangtua/v2" />
        {/* page title end */}

        {/* hubungkan start */}
        <div id="user__profile" className={`w-[85%] h-screen bg-red-200 flex flex-col items-center gap-4 py-6`}>
          {/* masukkan username anak start */}
          <div id="insert__child__username" className="w-full bg-red-400 flex flex-col gap-6">
            <p className="text-center text-violet-900 text-b-md font-semibold">Masukkan Username Anak</p>

            <TextInput type="text" name="username" id="username" placeholder="Username Anak" required />

            <div>
              <SubmitBtn text="Cek Username" />
              <p id="check_username_error" className="text-left text-b-xsm text-emerald-600 mt-1">
                Username ditemukan
              </p>
            </div>

            {isCodeModalOpen && <ShowConnectCode toggleModal={toggleCodeModal} />}
          </div>
          {/* masukkan username anak end*/}

          {/* username anak ditemukan start */}
          <div id="child__found" className="w-full bg-red-300 flex flex-col items-center gap-3">
            <img id="child__profile__picture" src={ProfPic} className={`w-20 h-20 rounded-full`} />

            <p className="text-b-md font-bold mb-4">Nama Anak</p>

            <SubmitBtn text="Selanjutnya" onClick={toggleCodeModal} />
          </div>
          {/* username anak ditemukan end */}
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
