import { useState } from 'react';
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '80vh',
  width: '100vw'
};

const center = {
  lat: 40.75378,
  lng: -73.55658
};

const zoom = 10;

export default function GoogleMapsSearchBox({ selectPosition, setSelectPosition }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyABX4LTqTLQGg_b3jFOH8Z6_H5CDqn8tbc',
    libraries: ['places']
  });

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
      {isLoaded && (
        <div>
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
      )}
    </div>
  );
}
