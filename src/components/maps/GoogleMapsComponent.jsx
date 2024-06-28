import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker, Circle, DrawingManager, Polygon } from '@react-google-maps/api';
import ChildMarkerImg from '../../assets/images/child_marker.png';
// import './GoogleMapsComponent.css';

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
  circleRadius,
  polygon,
  setPolygon,
  setPolygonPoints,
  polygonPoints
}) {
  const [childPosition, setChildPosition] = useState(centerPositionDefault);
  const [geofPosition, setGeofPosition] = useState(centerPositionDefault);
  const [centerPosition, setCenterPosition] = useState(centerPositionDefault);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);
  // const [polygonPoints, setPolygonPoints] = useState([]);
  const polygonRef = useRef(null);

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
    if (geofMarkerPosition) {
      setCenterPosition({ lat: geofMarkerPosition.lat, lng: geofMarkerPosition.lon });
    } else if (childMarkerPosition && !geofMarkerPosition) {
      setCenterPosition({ lat: childMarkerPosition.lat, lng: childMarkerPosition.lon });
    }
  }, [geofMarkerPosition, childMarkerPosition]);

  useEffect(() => {
    if (polygonPoints && polygonPoints.length > 0) {
      const firstPoint = polygonPoints[0];
      setCenterPosition({ lat: firstPoint.lat, lng: firstPoint.lng });
    }
  }, [polygonPoints]);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth <= 600;
      setIsSmallScreen(isSmall);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!polygon && polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null;
      setPolygonPoints([]);
    }
  }, [polygon, setPolygonPoints]);

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

  const handlePolygonComplete = (polygon) => {
    // Remove the existing polygon if there is one
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
    }

    // Set the new polygon
    polygonRef.current = polygon;

    // Get the coordinates of the new polygon
    const path = polygon.getPath();
    const coordinates = [];

    for (let i = 0; i < path.getLength(); i++) {
      const point = path.getAt(i);
      coordinates.push({ lat: point.lat(), lng: point.lng() });
    }

    setPolygonPoints(coordinates);
    // console.log('Polygon Coordinates:', coordinates);
  };

  // const handlePolygonEdit = (polygon) => {
  //   const path = polygon.getPath();
  //   const coordinates = [];

  //   for (let i = 0; i < path.getLength(); i++) {
  //     const point = path.getAt(i);
  //     coordinates.push({ lat: point.lat(), lng: point.lng() });
  //   }

  //   setPolygonPoints(coordinates);
  //   console.log('Updated Polygon Coordinates:', coordinates);
  // };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={centerPosition ? centerPosition : centerPositionDefault}
      zoom={13}
      onClick={handleMapClick}
      options={{
        mapTypeControl: !isSmallScreen,
        streetViewControl: true,
        zoomControl: true,

        mapTypeControlOptions: {
          position: isSmallScreen ? null : window.google.maps.ControlPosition.TOP_RIGHT
        },
        streetViewControlOptions: {
          position: isSmallScreen && window.google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControlOptions: {
          position: isSmallScreen && window.google.maps.ControlPosition.TOP_RIGHT
        }
      }}
    >
      {/* marker */}
      {showChildMarker && (
        <Marker
          position={childPosition}
          draggable={isMarkerDraggable}
          onDragEnd={handleChildMarkerDragEnd}
          icon={ChildMarkerImg}
        />
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

      {/* Drawing Manager for Polygon */}
      {polygon && (
        <DrawingManager
          onPolygonComplete={handlePolygonComplete}
          drawingMode={window.google.maps.drawing.OverlayType.POLYGON}
          // draggable
          editable
          options={{
            drawingControl: false,
            polygonOptions: {
              fillColor: '#C4B5FD',
              fillOpacity: 0.4,
              strokeColor: '#8B5CF6',
              strokeWeight: 2,
              clickable: true,
              editable: true,
              // draggable: true,
              zIndex: 1
            }
          }}
        />
      )}

      {/* show polygon */}
      {polygonPoints && polygonPoints.length > 0 && (
        <Polygon
          paths={polygonPoints}
          editable={true}
          draggable={true}
          options={{
            fillColor: '#C4B5FD',
            fillOpacity: 0.4,
            strokeColor: '#8B5CF6',
            strokeWeight: 2,
            clickable: true,
            editable: true,
            draggable: true,
            zIndex: 1
          }}
        />
      )}
      {/* Editable Polygon */}
      {/* {polygonPoints.length > 0 && (
        <Polygon
          paths={polygonPoints}
          editable={true}
          draggable={true}
          onMouseUp={() => handlePolygonEdit(polygonRef.current)}
          onDragEnd={() => handlePolygonEdit(polygonRef.current)}
          options={{
            fillColor: '#2196F3',
            fillOpacity: 0.5,
            strokeWeight: 2,
            clickable: true,
            editable: true,
            draggable: true,
            zIndex: 1
          }}
        />
      )} */}
    </GoogleMap>
  );
}
