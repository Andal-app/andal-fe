import React from 'react';

function SubmitBtn({
  type = 'submit',
  text = 'Tambah',
  onClick,
  bgColor = 'bg-violet-700',
  bgColorHover = 'bg-violet-800'
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-12 w-full text-white ${bgColor} hover:${bgColorHover}  focus:ring-2 focus:outline-none focus:ring-violet-300 font-bold rounded-lg text-b-md px-5 py-2.5 text-center`}
    >
      {text}
    </button>
  );
}

export default SubmitBtn;
