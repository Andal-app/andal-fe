import React from 'react';
import { Icon } from '@iconify/react';

const BasicModal = ({ children, toggleModal }) => {
  // Menghentikan penyebaran event ke div yang ditunjuk
  const handlePropagation = (e) => {
    e.stopPropagation();
  };

  return (
    // transparent layer start
    <div
      id="transparent__layer"
      className="absolute inset-0 h-screen bg-neutral-700 bg-opacity-50 flex justify-center items-center"
      onClick={toggleModal}
    >
      {/* modal box start */}
      <div id="modal__box" onClick={handlePropagation} className="bg-white w-[360px] rounded-xl p-4 min-h-56">
        {/* close button start */}
        <div className="flex justify-end mb-2">
          <button id="close__button" onClick={toggleModal} className="w-6 h-6">
            <Icon icon="mingcute:close-line" className={`w-5 h-5 text-neutral-600 `} />
          </button>
        </div>
        {/* close button end */}

        {children}
      </div>
      {/* modal box end */}
    </div>
    // transparent layer end
  );
};

export default BasicModal;
