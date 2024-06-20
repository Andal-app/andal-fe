import React from 'react';
import BasicModal from '../modals/BasicModal';
import ShowConnectCode from './ShowConnectCode/ShowConnectCode';

function ShowConnectCodeModal({ toggleModal, verifCode }) {
  return (
    <BasicModal toggleModal={toggleModal}>
      <ShowConnectCode verifCode={verifCode} subtitle="Masukkan kode pada ponsel anak" />
    </BasicModal>
  );
}

export default ShowConnectCodeModal;
