import React, { useState } from 'react';
import InputChildUname from '../components/connect/InputChildUname';
import InputConnectCode from '../components/connect/InputConnectCode';
import ShowConnectCode from '../components/connect/ShowConnectCode';
import BasicModal from '../components/modals/BasicModal';
import DeleteConfirmModal from '../components/modals/DeleteConfirmModal';

function PopUpTrial() {
  const [isConnectModalOpen, setConnectModalOpen] = useState(false);
  const [isCodeModalOpen, setCodeModalOpen] = useState(false);
  const [isInputCodeModalOpen, setIsInputCodeModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

  const toggleConnectModal = () => {
    setConnectModalOpen(!isConnectModalOpen);
  };
  const toggleCodeModal = () => {
    setCodeModalOpen(!isCodeModalOpen);
  };
  const toggleInputCodeModal = () => {
    setIsInputCodeModalOpen(!isInputCodeModalOpen);
  };

  const toggleDeleteConfirmModal = () => {
    setIsDeleteConfirmModalOpen(!isDeleteConfirmModalOpen);
  };

  return (
    <div>
      <button className="bg-violet-300 w-36" onClick={toggleConnectModal}>
        open input child uname
      </button>

      <button className="bg-violet-300 w-36" onClick={toggleCodeModal}>
        open show connect code
      </button>

      <button className="bg-violet-300 w-36" onClick={toggleInputCodeModal}>
        open input connect code
      </button>

      <button className="bg-violet-300 w-36" onClick={toggleDeleteConfirmModal}>
        delete confirm
      </button>

      {isConnectModalOpen && <InputChildUname toggleModal={toggleConnectModal} />}

      {/* <InputConnectCode /> */}

      {isInputCodeModalOpen && <InputConnectCode toggleModal={toggleInputCodeModal} />}

      {isCodeModalOpen && <ShowConnectCode toggleModal={toggleCodeModal} />}

      {isDeleteConfirmModalOpen && <DeleteConfirmModal toggleModal={toggleDeleteConfirmModal} />}
    </div>
  );
}

export default PopUpTrial;
