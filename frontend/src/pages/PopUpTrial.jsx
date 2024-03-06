import React, { useState } from 'react';
import InputChildUname from '../components/connect/InputChildUname';
import ShowConnectCode from '../components/connect/ShowConnectCode';
import BasicModal from '../components/modals/BasicModal';

function PopUpTrial() {
  const [isConnectModalOpen, setConnectModalOpen] = useState(false);
  const [isCodeModalOpen, setCodeModalOpen] = useState(false);

  const toggleConnectModal = () => {
    setConnectModalOpen(!isConnectModalOpen);
  };

  const toggleCodeModal = () => {
    setCodeModalOpen(!isCodeModalOpen);
  };

  const handlePropagation = (e) => {
    // Menghentikan penyebaran event ke atas
    e.stopPropagation();
  };

  return (
    <div>
      <button className="bg-violet-300 w-36" onClick={toggleConnectModal}>
        open input child uname
      </button>

      <button className="bg-violet-300 w-36" onClick={toggleCodeModal}>
        open show connect code
      </button>

      {isConnectModalOpen && (
        <InputChildUname toggleConnectModal={toggleConnectModal} handlePropagation={handlePropagation} />
      )}

      {isCodeModalOpen && <ShowConnectCode toggleCodeModal={toggleCodeModal} handlePropagation={handlePropagation} />}
    </div>
  );
}

export default PopUpTrial;
