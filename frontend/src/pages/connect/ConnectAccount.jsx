import React from 'react';
import Sidebar from '../../components/navigation/Sidebar';

const ConnectAccount = ({ user }) => {
  return (
    <div className="flex">
      <Sidebar user={user} />

      <main className="w-full lg:w-1/2 lg:border-r lg:border-neutral-300">
        {/* page title start */}
        <h1 className="hidden lg:block text-b-lg font-bold text-center py-6">Hubungkan Akun Anak</h1>
        {/* page title end */}

        {/* hubungkan start */}
        <div id="user__profile" className={`flex flex-col items-center gap-4 py-6`}>
          satu
        </div>
        {/* hubungkan end */}
      </main>
      {/* 
  <div>
    <BottomNavbar className="h-screen flex justify-center items-center bg-gray-900" />
  </div> */}
    </div>
  );
};

export default ConnectAccount;
