import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import axios from 'axios';

const GoogleMapsSearchBox = ({ selectPosition, setSelectPosition }) => {
  const [searchText, setSearchText] = useState('');
  const [listPlace, setListPlace] = useState([]);
  const searchResultRef = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
        params: {
          query: searchText,
          key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        }
      });

      setListPlace(response.data.results);
    } catch (error) {
      console.error('Error fetching Google Places API:', error);
    }
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
        onSubmit={handleSearch}
        className="w-full h-[40px] border-2 border-violet-900 rounded-3xl flex items-center justify-between overflow-hidden bg-white"
      >
        <input
          type="text"
          placeholder="Cari"
          aria-label="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full text-b-md font-medium focus:outline-none focus:border-transparent px-4"
        />

        <button type="submit" className="w-14 h-full flex items-center justify-center">
          <Icon icon={'iconamoon:search-bold'} className="w-[20px] h-[20px] text-violet-900" />
        </button>
      </form>
      {/* searchbar end  */}

      {/* result list start */}
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
              setSelectPosition({
                lat: item.geometry.location.lat,
                lon: item.geometry.location.lng,
                display_name: item.formatted_address
              });
              setListPlace([]); // Close the list after selection
            }}
          >
            <div className="py-1 min-w-8 flex justify-center">
              <Icon icon={'tabler:map-pin'} className="w-5 h-5 text-violet-900" />
            </div>
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
      {/* result list end */}
    </div>
  );
};

export default GoogleMapsSearchBox;
