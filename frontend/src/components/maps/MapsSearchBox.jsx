import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

const data = [{ result: 'satu' }, { result: 'dua' }, { result: 'tiga' }, { result: 'empat' }, { result: 'lima' }];

const NOMINATIM_BASE_URL = process.env.REACT_APP_NOMINATIM_BASE_URL;

const MapsSearchBox = (props) => {
  const { selectPositon, setSelectPosition } = props;
  const [searchText, setSearchText] = useState('');
  const [listPlace, setListPlace] = useState([]);
  const searchResultRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

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
  };

  const handleClickOutside = (event) => {
    if (searchResultRef.current && !searchResultRef.current.contains(event.target)) {
      setListPlace([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      {/* searchbar start */}
      <form
        id="searchbar"
        // onChange={handleSubmit}
        onSubmit={handleSubmit}
        className="w-full h-[40px] border-2 border-violet-900 rounded-3xl flex items-center justify-between overflow-hidden bg-white"
      >
        <input
          type="text"
          placeholder="Cari"
          aria-label="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          className="w-full text-b-md font-medium focus:outline-none focus:border-transparent px-4"
        />

        <button type="submit" className="w-14 h-full flex items-center justify-center">
          <Icon icon={'iconamoon:search-bold'} className="w-[20px] h-[20px] text-violet-900" />
        </button>
      </form>
      {/* searchbar end  */}

      {/*  result list start */}
      <ul
        id="search__result"
        ref={searchResultRef}
        className={`w-full lg:w-[700px] mt-1 ${
          listPlace.length > 0 && 'py-2'
        } bg-white text-b-md rounded-xl drop-shadow-xl`}
      >
        {listPlace?.map((item) => (
          <li
            key={item.place_id}
            className="px-3 py-2 flex hover:bg-violet-50 hover:cursor-pointer"
            onClick={() => {
              setSelectPosition(item);
              setListPlace([]); // Close the list after selection
            }}
          >
            <div className="py-1 min-w-8 flex justify-center">
              <Icon icon={'tabler:map-pin'} className="w-5 h-5 text-violet-900" />
            </div>
            <p>{item.display_name}</p>
          </li>
        ))}
      </ul>
      {/* result list end */}
    </div>
  );
};

export default MapsSearchBox;
