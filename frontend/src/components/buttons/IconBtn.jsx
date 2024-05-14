import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const IconBtn = ({ icon, text, to }) => {
  return (
    <Link to="" className="w-full h-full flex items-center justify-center gap-1 bg-violet-600 text-white rounded-md">
      <div>
        <Icon icon={icon} className="w-6 h-6" />
      </div>
      <p className="text-b-md font-semibold">{text}</p>
    </Link>
  );
};

export default IconBtn;
