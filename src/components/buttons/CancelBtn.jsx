import React from 'react';
import { Link } from 'react-router-dom';

function CancelBtn({ link, onClick }) {
  return (
    <button
      to={link}
      onClick={onClick}
      className={`h-12 w-full text-red-500 bg-white hover:bg-neutral-50 border-2 border-red-500 focus:ring-2 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-b-md px-5 py-2.5 text-center`}
    >
      Batalkan
    </button>
  );
}

export default CancelBtn;
