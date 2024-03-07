import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import BasicLayout from '../../layouts/general/BasicLayout';
import BottomWave1 from '../../assets/waves/wave_bottom_1.svg';
import OvalNextBtn from '../../components/buttons/OvalNextBtn';

function LandingPage() {
  return (
    <BasicLayout>
      <div className="relative w-full h-full bg-map flex justify-center items-center">
        <div className="z-10 flex flex-col items-center gap-8 text-center -mt-36 lg:mt-0">
          <div className="bg-violet-300 w-32 h-32 rounded-full">logo</div>
          <h1 className="text-h-lg font-bold text-violet-900">Selamat Datang</h1>
          <p className="text-b-sm lg:text-b-md text-neutral-900 max-w-[85%] lg:max-w-[420px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
          </p>
        </div>

        <div className="z-0 absolute w-full h-full bg-neutral-400 opacity-30 flex justify-center items-center"></div>

        <div className="z-20 lg:hidden fixed bottom-0 left-0 right-0 w-full">
          <img src={BottomWave1} className="w-full" />

          {/* mobile next button start */}
          <Link className="z-30 absolute right-8 bottom-14 bg-white hover:bg-violet-50 w-12 h-12 rounded-full flex justify-center items-center">
            <Icon icon={'heroicons:arrow-right-16-solid'} className="w-10 h-10 text-black" />
          </Link>
          {/* mobile next button end*/}
        </div>

        {/* desktop next button start */}
        <OvalNextBtn text="Lanjut" linkTo="" />
        {/* desktop next button end*/}
      </div>
    </BasicLayout>
  );
}

export default LandingPage;
