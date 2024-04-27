import React from 'react';
import BasicModal from '../modals/BasicModal';

function ShowConnectCode({ toggleModal, verifCode }) {
  return (
    <BasicModal toggleModal={toggleModal}>
      <div className="flex flex-col items-center gap-6">
        <p className="text-yellow-900 text-h-md font-bold">KODE ANDA</p>

        <div className="text-yellow-900 text-h-xl font-bold bg-yellow-50 rounded-xl border border-yellow-300 px-6 tracking-[0.3em] drop-shadow-xl">
          {verifCode}
        </div>

        <p>Masukkan kode pada ponsel anak</p>
      </div>
    </BasicModal>
  );
}

export default ShowConnectCode;
