import React from 'react';
import BasicModal from '../modals/BasicModal';
import SubmitBtn from '../buttons/SubmitBtn';
import CodeInput from '../inputs/CodeInput';

function InputConnectCode({ toggleModal }) {
  return (
    <BasicModal toggleModal={toggleModal}>
      <form className="flex flex-col gap-4">
        {/* modal title start */}
        <div className="text-violet-900 text-center">
          <p className="font-bold text-h-md">MASUKKAN KODE</p>
          <p className="text-b-md">dari Ponsel Orang Tua</p>
        </div>
        {/* modal title end */}

        <div className="flex justify-center">
          <CodeInput />
        </div>

        <p id="error__message" className="hidden text-red-600 text-b-sm">
          Username tidak ditemukan
        </p>

        <SubmitBtn type="submit" text="Hubungkan" />
      </form>
    </BasicModal>
  );
}

export default InputConnectCode;
