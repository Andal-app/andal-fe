import { useState } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';
import { Icon } from '@iconify/react';
import './GoogleMapsSearchBox.css';

const GoogleMapsSearchBox = ({ setSelectPosition }) => {
  const [searchBox, setSearchBox] = useState(null);

  const onSearchBoxLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (places && places.length > 0) {
      const location = places[0].geometry.location;
      const lat = location.lat();
      const lng = location.lng();
      // console.log('Latitude: ', lat);
      // console.log('Longitude: ', lng);
      setSelectPosition({ lat, lon: lng });
    }
  };

  const handleButtonClick = () => {
    // Trigger the places changed event
    onPlacesChanged();
  };

  return (
    <div className="w-full">
      <StandaloneSearchBox onLoad={onSearchBoxLoad} onPlacesChanged={onPlacesChanged}>
        <div className="w-full h-[40px] border-2 border-violet-900 rounded-3xl flex items-center justify-between overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Cari Lokasi"
            className="w-full text-b-md font-medium focus:outline-none focus:border-transparent px-4"
          />
          <button type="submit" className="w-14 h-full flex items-center justify-center">
            <Icon icon={'iconamoon:search-bold'} className="w-[20px] h-[20px] text-violet-900" />
          </button>
        </div>
      </StandaloneSearchBox>
    </div>
  );
};

export default GoogleMapsSearchBox;
