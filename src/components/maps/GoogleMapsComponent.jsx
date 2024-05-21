import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';

const centerPositionDefault = { lat: -7.7761951, lng: 110.3762101 };

const containerStyle = {
  width: '100%',
  height: '100%'
};

export default function GoogleMapsComponent({
  childMarkerPosition,
  setChildMarkerPosition,
  geofMarkerPosition,
  setGeofMarkerPosition,
  showChildMarker,
  showGeofMarker,
  isMarkerDraggable,
  circleRadius
}) {
  // const locationSelection = selectPosition ? { lat: selectPosition.lat, lng: selectPosition.lon } : centerPosition;

  const [childPosition, setChildPosition] = useState(centerPositionDefault);
  const [geofPosition, setGeofPosition] = useState(centerPositionDefault);
  const [centerPosition, setCenterPosition] = useState(centerPosition);

  useEffect(() => {
    if (childMarkerPosition) {
      setChildPosition({ lat: childMarkerPosition.lat, lng: childMarkerPosition.lon });
    }
  }, [childMarkerPosition]);

  useEffect(() => {
    if (geofMarkerPosition) {
      setGeofPosition({ lat: geofMarkerPosition.lat, lng: geofMarkerPosition.lon });
    }
  }, [geofMarkerPosition]);

  useEffect(() => {
    // Update centerPosition when geofMarkerPosition/childMarkerPosition changes
    if (geofMarkerPosition) {
      setCenterPosition({ lat: geofMarkerPosition.lat, lng: geofMarkerPosition.lon });
    } else if (childMarkerPosition && !geofMarkerPosition) {
      setCenterPosition({ lat: childMarkerPosition.lat, lng: childMarkerPosition.lon });
    }
  }, [geofMarkerPosition, childMarkerPosition]);

  const handleMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();

    if (showChildMarker) {
      setChildPosition({ lat, lng });
      setChildMarkerPosition({ lat, lon: lng });
    }

    if (showGeofMarker) {
      setGeofPosition({ lat, lng });
      setGeofMarkerPosition({ lat, lon: lng });
    }
  };

  const handleChildMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setChildMarkerPosition({ lat, lon: lng });
  };

  const handleGeofMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setGeofMarkerPosition({ lat, lon: lng });
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={centerPosition ? centerPosition : centerPositionDefault}
      zoom={13}
      onClick={handleMapClick}
    >
      {/* marker */}
      {showChildMarker && (
        <Marker position={childPosition} draggable={isMarkerDraggable} onDragEnd={handleChildMarkerDragEnd} />
      )}
      {showGeofMarker && (
        <Marker position={geofPosition} draggable={isMarkerDraggable} onDragEnd={handleGeofMarkerDragEnd} />
      )}
      {/* circle for geofMarker */}
      {showGeofMarker && (
        <Circle
          center={geofPosition}
          radius={circleRadius}
          options={{
            strokeColor: '#C4B5FD',
            strokeWeight: 2,
            fillColor: '#C4B5FD'
          }}
        />
      )}
    </GoogleMap>
  );
}
