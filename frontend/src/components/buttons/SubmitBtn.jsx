import React from 'react';

function SubmitBtn({ type, text }) {
  return (
    <button
      type={type}
      className={`h-14 w-full text-white bg-violet-700 hover:bg-violet-800 focus:ring-2 focus:outline-none focus:ring-violet-300 font-bold rounded-lg text-b-lg px-5 py-2.5 text-center`}
    >
      {text}
    </button>
  );
}

export default SubmitBtn;
