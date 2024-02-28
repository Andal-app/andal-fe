import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

function OvalNextBtn({ text = 'Lewati', linkTo }) {
  return (
    <Link
      to={linkTo}
      className="z-30 absolute right-8 top-8 bg-white hover:bg-violet-50 border-2 border-violet-200 w-40 h-12 rounded-full flex justify-center items-center text-violet-900"
    >
      <p className="text-h-sm font-semibold">{text}</p>
      <Icon icon={'heroicons:arrow-right-16-solid'} className="w-10 h-10" />
    </Link>
  );
}

export default OvalNextBtn;
