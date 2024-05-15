import React from 'react';
import { Icon } from '@iconify/react';

function LocationListView({ location, time }, index) {
  return (
    <li
      key={index}
      className="flex items-center gap-5 px-6 lg:px-10 py-4 border-b border-neutral-300 hover:bg-neutral-50 duration-300"
    >
      {/* icon start */}
      <div className="basis- pt-1">
        <div
          id="notification__icon__circle"
          className="w-8 h-8 rounded-full border border-neutral-200 flex justify-center items-center"
        >
          <Icon icon="tdesign:location" className={`w-6 h-6 text-red-400`} />
        </div>
      </div>
      {/* icon end */}

      {/* content start */}
      <div className="w-[60%] lg:w-[80%]">
        <p className="text-b-sm font-bold">{location}</p>
        <p className="text-b-xsm text-neutral-500">{time}</p>
      </div>
      {/* content end */}

      {/* button start */}
      <div className="flex gap-2">
        <button className="px-2 lg:w-20 h-7 text-red-600 text-b-xsm border border-red-600 hover:bg-red-400 hover:text-white hover:border-none rounded-lg transition-all duration-300">
          Hapus
        </button>

        <button className="w-20 h-7 text-violet-900 text-b-xsm border border-violet-900 hover:bg-violet-500 hover:text-white hover:border-none rounded-lg transition-all duration-300">
          Lihat detail
        </button>
      </div>
      {/* button end */}
    </li>
  );
}

export default LocationListView;
