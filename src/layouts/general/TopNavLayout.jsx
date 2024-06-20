import React from 'react';
import Sidebar from '../../components/navigation/Sidebar';
import BottomNavbar from '../../components/navigation/BottomNavbar';
import TopBackNav from '../../components/navigation/TopBackNav';

function TopNavLayout({ user, children, topNavData }) {
  return (
    <div className="flex">
      <Sidebar user={user} />
      <BottomNavbar user={user} />

      <div className="w-full lg:w-1/2 h-screen flex flex-col items-center lg:border-r lg:border-neutral-300">
        {/* page title start */}
        <TopBackNav title={topNavData?.title} navigateTo={topNavData?.navigateTo} />
        {/* page title end */}

        <main>{children}</main>
      </div>
      {/* 
<div>
  <BottomNavbar className="h-screen flex justify-center items-center bg-gray-900" />
</div> */}
    </div>
  );
}

export default TopNavLayout;
