import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';

const centerPosition = { lat: -7.7761951, lng: 110.3762101 };

const containerStyle = {
  width: '100%',
  height: '100%'
};

export default function GoogleMapsComponent({
  selectPosition,
  setSelectPosition,
  secondMarkerPosition,
  setSecondMarkerPosition,
  isMarkerDraggable = true,
  showCircle = true,
  circleRadius
}) {
  const locationSelection = selectPosition ? { lat: selectPosition.lat, lng: selectPosition.lon } : centerPosition;

  const [markerPosition, setMarkerPosition] = useState(centerPosition);

  useEffect(() => {
    if (selectPosition) {
      setMarkerPosition({ lat: selectPosition.lat, lng: selectPosition.lon });
    }
  }, [selectPosition]);

  const handleMapClick = (event) => {
    if (isMarkerDraggable) {
      const { latLng } = event;
      const lat = latLng.lat();
      const lng = latLng.lng();
      setMarkerPosition({ lat, lng });
      setSelectPosition({ lat, lon: lng });
    }
  };

  const handleMarkerDragEnd = (event) => {
    if (isMarkerDraggable) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectPosition({ lat, lon: lng });
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={markerPosition} zoom={13} onClick={handleMapClick}>
        {/* marker */}
        <Marker position={markerPosition} draggable={isMarkerDraggable} onDragEnd={handleMarkerDragEnd} />
        {/* circle */}
        {showCircle && <Circle center={markerPosition} radius={circleRadius} />}
        {/* second marker */}
        {secondMarkerPosition && <Marker position={{ lat: secondMarkerPosition.lat, lng: secondMarkerPosition.lon }} />}
      </GoogleMap>
    </LoadScript>
  );
}
