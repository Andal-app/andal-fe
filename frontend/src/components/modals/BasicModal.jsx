import React from 'react';

const BasicModal = ({ children, toggleModal, handlePropagation }) => {
  return (
    // transparent layer start
    <div
      id="transparent__layer"
      className="absolute inset-0 h-screen bg-neutral-700 bg-opacity-50 flex justify-center items-center"
      onClick={toggleModal}
    >
      {/* modal box start */}
      <div id="modal__box" onClick={handlePropagation} className="bg-white w-[360px] rounded-xl p-4">
        {children}
      </div>
      {/* modal box end */}
    </div>
    // transparent layer end
  );
};

export default BasicModal;
