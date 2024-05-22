import React from 'react';
import CancelBtn from '../buttons/CancelBtn';
import RedConfirmBtn from '../buttons/RedConfirmBtn';
import BasicModal from './BasicModal';

const RedConfirmModal = ({ title, detail, toggleModal, confirmBtnText, onConfirmClick, onCancelClick }) => {
  return (
    <BasicModal toggleModal={toggleModal}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-red-500 text-h-sm font-bold">{title}</p>
          <p>{detail}</p>
        </div>

        <div className="flex flex-col gap-1">
          <RedConfirmBtn onClick={onConfirmClick} confirmBtnText={confirmBtnText} />
          <CancelBtn onClick={onCancelClick} />
        </div>
      </div>
    </BasicModal>
  );
};

export default RedConfirmModal;
