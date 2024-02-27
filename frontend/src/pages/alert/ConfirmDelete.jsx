import React from 'react';
import TopWave1Red from '../../assets/waves/wave_top_1_red.svg';
import CancelBtn from '../../components/buttons/CancelBtn';
import DeleteBtn from '../../components/buttons/DeleteBtn';
import Sidebar from '../../components/navigation/Sidebar';

function ConfirmDelete() {
  return (
    <div className="flex ">
      <style>
        {`
      body {
        overflow: hidden;
      }
    `}
      </style>

      <Sidebar />

      <div id="main__container" className="w-full lg:w-1/2 bg-white h-screen flex items-center justify-center">
        {/* top wave start */}
        <div className="lg:hidden fixed top-0 left-0 right-0 w-full">
          <img src={TopWave1Red} className="w-full" />
        </div>
        {/* top wave end */}

        <main className="mt-[700px] h-full px-8 text-center flex flex-col gap-48">
          <div className="px-8 ">
            <h5 className="font-bold text-b-xl mb-6">Yakin ingin menghapus akun Anda secara permanen?</h5>
            <p className="text-b-lg">Anda tidak dapat mengembalikan data yang telah dihapus.</p>
          </div>

          <div className="flex flex-col gap-3">
            <DeleteBtn />

            <CancelBtn />
          </div>
        </main>
      </div>
    </div>
  );
}

export default ConfirmDelete;
