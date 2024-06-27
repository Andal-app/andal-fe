import React from 'react';
import Sidebar from '../../components/navigation/Sidebar';
import BottomNavbar from '../../components/navigation/BottomNavbar';
import TopBackNav from '../../components/navigation/TopBackNav';

const ScanQRCode = ({ user }) => {
  return (
    <div className="flex">
      <Sidebar user={user} />
      <BottomNavbar user={user} />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        {/* page title start */}
        <TopBackNav title="Hubungkan Akun Anak" navigateTo="/beranda/orangtua" />
        {/* page title end */}

        {/* scan QR start */}
        {/* letakkan qr code scanner di sini */}
        {/* scan QR end */}
      </div>
    </div>
  );
};

export default ScanQRCode;
