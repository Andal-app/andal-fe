import React from 'react';
import BasicLayout from '../../layouts/general/BasicLayout';

function LandingPage() {
  return (
    <BasicLayout>
      <div className="w-full h-full bg-map flex justify-center items-center">
        <div className="z-10 flex flex-col items-center gap-8 text-center">
          <div className="bg-violet-300 w-32 h-32 rounded-full">logo</div>
          <h1 className="text-h-lg font-bold text-violet-900">Selamat Datang</h1>
          <p className="text-b-lg text-neutral-900 max-w-[420px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>

        <div className="z-0 absolute w-full h-full bg-neutral-400 opacity-30 flex justify-center items-center"></div>
      </div>
    </BasicLayout>
  );
}

export default LandingPage;
