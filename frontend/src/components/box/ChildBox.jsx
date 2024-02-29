import React from 'react';

function ChildBox({ fullName, profPic, index }) {
  return (
    <div
      id="child__box"
      key={index}
      className="h-24 w-fit min-w-80 px-8 my-2 bg-yellow-50 border border-yellow-300 text-yellow-900 rounded-xl drop-shadow-xl flex items-center gap-4"
    >
      <img src={profPic} className="w-16 h-16 rounded-full"></img>
      <p className="text-b-lg">{fullName} </p>
    </div>
  );
}

export default ChildBox;
