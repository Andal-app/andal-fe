import { useState } from 'react';
import { StandaloneSearchBox } from '@react-google-maps/api';

const GoogleMapsSearchBox = ({ selectPosition, setSelectPosition }) => {
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
      console.log('Latitude: ', lat);
      console.log('Longitude: ', lng);
      setSelectPosition({ lat, lon: lng });
    }
  };

  return (
    <div className="App">
      <StandaloneSearchBox onLoad={onSearchBoxLoad} onPlacesChanged={onPlacesChanged}>
        <input
          type="text"
          placeholder="Enter your location"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: 'absolute',
            left: '50%',
            marginLeft: '-120px'
          }}
        />
      </StandaloneSearchBox>
    </div>
  );
};

export default GoogleMapsSearchBox;
