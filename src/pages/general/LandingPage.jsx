import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import BasicLayout from '../../layouts/general/BasicLayout';
import BottomWave1 from '../../assets/waves/wave_bottom_1.svg';
import OvalNextBtn from '../../components/buttons/OvalNextBtn';
import LogoPrimary from '../../assets/images/andal_logo_primary.svg';

function LandingPage() {
  return (
    <BasicLayout>
      <div className="relative w-full h-full bg-map flex justify-center items-center">
        <div className="z-10 flex flex-col items-center gap-6 text-center -mt-36 lg:mt-0">
          <div id="logo" className="bg-violet-300 w-32 h-32 rounded-full">
            <img className="w-full h-full" src={LogoPrimary} alt="Logo Andal" />
          </div>

          <h1 className="text-h-lg font-bold text-violet-900">Selamat Datang</h1>
          <p className="text-b-sm lg:text-b-lg font-medium text-neutral-900 max-w-[85%] lg:max-w-[420px]">
            Lacak keberadaan anak Anda dengan aplikasi <b>Andal</b>. Tetapkan <b>jadwal dan lokasi</b> kegiatan anak.
            Kami akan mengirimkan <b>notifikasi</b> jika Anak keluar dari wilayah kegiatannya.
          </p>
        </div>

        <div className="z-0 absolute w-full h-full bg-neutral-400 opacity-30 flex justify-center items-center"></div>

        <div className="z-20 lg:hidden fixed bottom-0 left-0 right-0 w-full">
          <img src={BottomWave1} className="w-full" alt="Bottom Wave 1" />

          {/* mobile next button start */}
          <Link
            to="/tutorial"
            className="z-30 absolute right-8 bottom-14 bg-white hover:bg-violet-50 w-12 h-12 rounded-full flex justify-center items-center"
          >
            <Icon icon={'heroicons:arrow-right-16-solid'} className="w-10 h-10 text-black" />
          </Link>
          {/* mobile next button end*/}
        </div>

        {/* desktop next button start */}
        <OvalNextBtn text="Lanjut" linkTo="/tutorial" />
        {/* desktop next button end*/}
      </div>
    </BasicLayout>
  );
}

export default LandingPage;
