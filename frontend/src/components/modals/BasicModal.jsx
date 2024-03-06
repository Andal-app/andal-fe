// BasicModal.jsx
import React from 'react';
import TextInput from '../inputs/TextInput';
import SubmitBtn from '../buttons/SubmitBtn';
import { Icon } from '@iconify/react';

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
          {/* close button start */}
          <div className="flex justify-end">
            <button id="close__button" onClick={toggleConnectModal}>
              <Icon icon="mingcute:close-line" className={`w-6 h-6 text-neutral-600 `} />
            </button>
          </div>
          {/* close button end */}

          {/* modal title start */}
          <p className="font-bold text-violet-900 text-b-xl text-center">Masukkan Username Anak</p>
          {/* modal title end */}

          <TextInput type="text" name="username" id="username" placeholder="" required />

          <p id="error__message" className="hidden text-red-600 text-b-sm">
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
