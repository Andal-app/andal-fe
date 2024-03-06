// BasicModal.jsx
import React from 'react';
import TextInput from '../inputs/TextInput';
import SubmitBtn from '../buttons/SubmitBtn';

const BasicModal = ({ toggleConnectModal, handlePropagation }) => {
  return (
    <div
      id="transparent__layer"
      className="absolute inset-0 h-screen bg-neutral-700 bg-opacity-50 flex justify-center items-center"
      onClick={toggleConnectModal}
    >
      {/* modal box start */}
      <div id="modal__box" onClick={handlePropagation} className="bg-white w-[360px] rounded-xl p-4">
        <form className="flex flex-col gap-4">
          <p className="font-bold text-violet-900 text-b-xl text-center">Masukkan Username Anak</p>

          <TextInput type="text" name="username" id="username" placeholder="" required />

          <p id="error__message" className="text-red-600 text-b-sm">
            Username tidak ditemukan
          </p>

          <SubmitBtn type="submit" text="Selanjutnya" />
        </form>
      </div>
      {/* modal box end */}
    </div>
  );
};

export default BasicModal;
