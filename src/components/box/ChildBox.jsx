import React from 'react';
import ProfPicDummy from '../../assets/images/profile_picture.jpeg';

function ChildBox({ fullname, profPic, onClick }) {
  return (
    <button
      id="child__box"
      onClick={onClick}
      className="h-36 lg:h-24 w-[48%] lg:w-fit lg:min-w-72 px-8 py-2 lg:py-0 my-1 bg-yellow-50 border border-yellow-300 text-yellow-900 rounded-xl drop-shadow-xl flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-4 text-wrap text-center"
    >
      <img src={profPic} alt="Gambar Profil" className="w-16 h-16 rounded-full"></img>
      <p className="text-b-md">{fullname} </p>
    </button>
  );
}

export default ChildBox;
