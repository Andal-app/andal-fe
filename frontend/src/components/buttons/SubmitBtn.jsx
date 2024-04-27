import React from 'react';

function SubmitBtn({ text, onClick }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`h-12 w-full text-white bg-violet-700 hover:bg-violet-800 focus:ring-2 focus:outline-none focus:ring-violet-300 font-bold rounded-lg text-b-md px-5 py-2.5 text-center`}
    >
      {text}
    </button>
  );
}

export default SubmitBtn;
