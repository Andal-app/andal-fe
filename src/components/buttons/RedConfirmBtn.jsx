import React from 'react';

function RedConfirmBtn({ onClick, confirmBtnText = 'Hapus' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 w-full text-white bg-red-500 hover:bg-red-600 focus:ring-2 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-b-md px-5 py-2.5 text-center`}
    >
      {confirmBtnText}
    </button>
  );
}

export default RedConfirmBtn;
