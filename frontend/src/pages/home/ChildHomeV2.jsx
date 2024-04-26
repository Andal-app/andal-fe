import React from 'react';
import PositionDetailBox from '../../components/box/PositionDetailBox';
import HomeLayout from '../../layouts/home/HomeLayout';

function ChildHomeV2({ user }) {
  return (
    <HomeLayout user={user}>
      <div className="relative mx-6 lg:mx-0 flex flex-col gap-3 lg:gap-4">
        {/* page title start */}
        <div className="lg:absolute lg:top-8 lg:left-8 lg:z-10 bg-violet-700 w-fit px-5 py-0.5 text-b-md font-bold rounded-md text-white">
          Posisi saya
        </div>
        {/* page title end */}

        {/* map start */}
        <div className="lg:z-0 bg-neutral-400 h-72 lg:h-screen">MAP MAP MAP MAP MAP MAP</div>
        {/* map end */}

        {/* position detail start */}
        <div className="bg-white lg:absolute lg:top-20 lg:left-8 lg:z-10 lg:rounded-xl lg:drop-shadow-xl lg:p-5">
          <PositionDetailBox />
        </div>
        {/* position detail end */}
      </div>
    </HomeLayout>
  );
}

export default ChildHomeV2;
