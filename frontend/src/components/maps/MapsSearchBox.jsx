import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const data = [{ result: 'satu' }, { result: 'dua' }, { result: 'tiga' }, { result: 'empat' }, { result: 'lima' }];

const MapsSearchBox = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div>
      {/* searchbar start */}
      <div
        id="searchbar"
        className="w-full h-[36px] border-2 border-violet-900 rounded-3xl flex items-center overflow-hidden"
      >
        <input
          type="text"
          placeholder="Cari"
          aria-label="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          className="text-b-md font-medium focus:outline-none focus:border-transparent px-5"
        />

        <button type="button" className="h-full w-14 flex items-center justify-center">
          <Icon icon={'iconamoon:search-bold'} className="w-[20px] h-[20px] text-violet-900" />
        </button>
      </div>
      {/* searchbar end  */}

      {/*  result list start */}
      <ul id="search__result" className="bg-red-300 text-b-md">
        {data.map((data, index) => (
          <li key={index} className="px-4 py-1">
            {data.result}
          </li>
        ))}
      </ul>
      {/* result list end */}
    </div>
  );
};

export default MapsSearchBox;
