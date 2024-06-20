import React from 'react';

const ShowConnectCode = ({
  verifCode,
  subtitle = 'Masukkan kode pada ponsel {peran}}',
  bgColor = 'bg-yellow-50',
  textColor = 'text-yellow-900',
  borderColor = 'border-yellow-300'
}) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className={`${textColor} text-h-md font-bold`}>KODE SAYA</p>

      <div
        className={`${textColor} ${bgColor} ${borderColor} text-h-xl font-bold  rounded-xl border  px-6 tracking-[0.3em] drop-shadow-xl`}
      >
        {verifCode}
      </div>

      <p>{subtitle}</p>
    </div>
  );
};

export default ShowConnectCode;
