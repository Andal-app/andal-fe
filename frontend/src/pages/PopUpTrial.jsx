import React, { useState } from 'react';
import InputChildUname from '../components/connect/InputChildUname';
import BasicModal from '../components/modals/BasicModal';

function PopUpTrial() {
  const [isConnectModalOpen, setConnectModalOpen] = useState(false);

  const toggleConnectModal = () => {
    setConnectModalOpen(!isConnectModalOpen);
  };

  const handlePropagation = (e) => {
    // Menghentikan penyebaran event ke atas
    e.stopPropagation();
  };

  return (
    <div>
      <button className="bg-violet-300 w-36" onClick={toggleConnectModal}>
        open modal
      </button>

      {isConnectModalOpen && (
        <InputChildUname toggleConnectModal={toggleConnectModal} handlePropagation={handlePropagation} />
      )}
    </div>
  );
}

export default PopUpTrial;
