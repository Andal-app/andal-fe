import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const data = [{ result: 'satu' }, { result: 'dua' }, { result: 'tiga' }, { result: 'empat' }, { result: 'lima' }];

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search?';

const MapsSearchBox = (props) => {
  const { selectPositon, setSelectPosition } = props;
  const [searchText, setSearchText] = useState('');
  const [listPlace, setListPlace] = useState([]);

  return (
    <div className="w-full">
      {/* searchbar start */}
      <div
        id="searchbar"
        className="w-full h-[40px] border-2 border-violet-900 rounded-3xl flex items-center overflow-hidden bg-white"
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

        <button
          type="button"
          className="h-full w-14 flex items-center justify-center"
          onClick={() => {
            const params = {
              q: searchText,
              // format: 'json',
              format: 'jsonv2',
              addressdetails: 1,
              // limit: 10,
              polygon_geojson: 0
            };
            const queryString = new URLSearchParams(params).toString();
            const requestOptions = {
              method: 'GET',
              redirect: 'follow'
            };
            fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
              .then((response) => response.text())
              .then((result) => {
                // console.log(JSON.parse(result));
                setListPlace(JSON.parse(result));
              })
              .catch((err) => console.log('error: ', err));
          }}
        >
          <Icon icon={'iconamoon:search-bold'} className="w-[20px] h-[20px] text-violet-900" />
        </button>
      </div>
      {/* searchbar end  */}

      {/*  result list start */}
      <ul id="search__result" className="bg-red-300 text-b-md">
        {listPlace?.map((item) => (
          <li
            key={item.place_id}
            className="px-4 py-1"
            onClick={() => {
              setSelectPosition(item);
            }}
          >
            {item.display_name}
          </li>
        ))}
      </ul>
      {/* result list end */}
    </div>
  );
};

export default MapsSearchBox;
