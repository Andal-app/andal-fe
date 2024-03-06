import React from 'react';
import BasicModal from '../modals/BasicModal';
import TextInput from '../inputs/TextInput';
import SubmitBtn from '../buttons/SubmitBtn';

function InputChildUname({ toggleModal }) {
  return (
    <BasicModal toggleModal={toggleModal}>
      <form className="flex flex-col gap-4">
        {/* modal title start */}
        <p className="font-bold text-violet-900 text-b-xl text-center">Masukkan Username Anak</p>
        {/* modal title end */}

        <TextInput type="text" name="username" id="username" placeholder="" required />

        <p id="error__message" className="hidden text-red-600 text-b-sm">
          Username tidak ditemukan
        </p>

        <SubmitBtn type="submit" text="Selanjutnya" />
      </form>
    </BasicModal>
  );
}

export default InputChildUname;
