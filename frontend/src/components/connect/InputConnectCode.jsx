import React from 'react';
import BasicModal from '../modals/BasicModal';
import TextInput from '../inputs/TextInput';
import SubmitBtn from '../buttons/SubmitBtn';

function InputConnectCode({ toggleModal, handlePropagation }) {
  return (
    <BasicModal toggleModal={toggleModal} handlePropagation={handlePropagation}>
      <form className="flex flex-col gap-4">
        {/* modal title start */}
        <div className="text-violet-900 text-center">
          <p className="font-bold text-h-md">MASUKKAN KODE</p>
          <p className="text-b-md">dari Ponsel Orang Tua</p>
        </div>
        {/* modal title end */}

        <TextInput type="text" name="username" id="username" placeholder="" required />

        <p id="error__message" className="hidden text-red-600 text-b-sm">
          Username tidak ditemukan
        </p>

        <SubmitBtn type="submit" text="Hubungkan" />
      </form>
    </BasicModal>
  );
}

export default InputConnectCode;
