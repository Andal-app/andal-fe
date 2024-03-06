import React from 'react';
import ReactCodeInput from 'react-code-input';
import BasicModal from '../modals/BasicModal';
import SubmitBtn from '../buttons/SubmitBtn';

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
          <ReactCodeInput
            id="connect__code"
            name="connect__code"
            type="text"
            fields={5}
            inputStyle={{
              width: '46px',
              height: '60px',
              marginLeft: '5px',
              marginRight: '5px',
              borderRadius: '0.6rem',
              border: '1px solid #4C1D95',
              textAlign: 'center',
              fontSize: '40px',
              color: '#4C1D95',
              fontWeight: '600',
              textTransform: 'uppercase'
            }}
          />
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
