import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

function TopBackNav({ title }) {
  return (
    <nav className="w-full lg:w-[80%] relative h-24 flex justify-center items-center">
      {/* back button start */}

      <Link className="absolute left-0 top-0 w-14 h-full flex items-center justify-center">
        <div className="flex justify-center items-center w-8 h-8 rounded-full bg-neutral-200">
          <Icon icon={'ic:round-arrow-back'} className="w-6 h-6 text-black" />
        </div>
      </Link>
      {/* back button end */}

      <h1 className="font-bold text-b-xl text-center">{title}</h1>
    </nav>
  );
}

export default TopBackNav;
