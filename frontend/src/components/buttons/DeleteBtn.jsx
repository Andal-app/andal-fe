import React from 'react';

function DeleteBtn() {
  return (
    <button
      type="button"
      className={`h-12 w-full text-white bg-red-500 hover:bg-red-600 focus:ring-2 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-b-md px-5 py-2.5 text-center`}
    >
      Hapus
    </button>
  );
}

export default DeleteBtn;
