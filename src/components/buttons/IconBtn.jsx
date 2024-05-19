import React from 'react';
import { Icon } from '@iconify/react';

const IconBtn = ({ icon, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full h-full flex items-center justify-center gap-1 bg-violet-600 text-white rounded-md"
    >
      <div>
        <Icon icon={icon} className="w-6 h-6" />
      </div>
      <p className="text-b-md font-semibold">{text}</p>
    </button>
  );
};

export default IconBtn;
