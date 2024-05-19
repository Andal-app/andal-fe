import React from 'react';
import CancelBtn from '../buttons/CancelBtn';
import DeleteBtn from '../buttons/DeleteBtn';
import BasicModal from './BasicModal';

const DeleteConfirmModal = ({ toggleModal, onDeleteClick, onCancelClick }) => {
  return (
    <BasicModal toggleModal={toggleModal}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-red-500 text-h-sm font-bold">Apakah Anda yakin ingin menghapus data?</p>
          <p>Data akan dihapus secara permanen</p>
        </div>

        <div className="flex flex-col gap-1">
          <DeleteBtn onClick={onDeleteClick} />
          {/* <button onClick={onCancelClick}>CANCEL</button> */}
          <CancelBtn onClick={onCancelClick} />
        </div>
      </div>
    </BasicModal>
  );
};

export default DeleteConfirmModal;
