import React from 'react';

function ChildBox({ fullName, profPic, index }) {
  return (
    <div
      id="child__box"
      key={index}
      className="h-36 lg:h-24 w-[48%] lg:w-fit lg:min-w-80 px-8 py-2 lg:py-0 my-1 bg-yellow-50 border border-yellow-300 text-yellow-900 rounded-xl drop-shadow-xl flex flex-col lg:flex-row items-center gap-4 text-wrap text-center"
    >
      <img src={profPic} className="w-16 h-16 rounded-full"></img>
      <p className="text-b-lg ">{fullName} </p>
    </div>
  );
}

export default ChildBox;
