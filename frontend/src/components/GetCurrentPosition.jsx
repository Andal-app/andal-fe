import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, FeatureGroup, Marker, Popup, useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useGlobalState } from '../state';
import icon from 'leaflet/dist/images/marker-icon.png';
import L from 'leaflet';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import GeofencingLocation from './GeofencingLocation';

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-geosearch/dist/geosearch.css';

const markerIcon = new L.icon({
  iconUrl: icon,
  iconSize: [30, 48],
  iconAnchor: [17, 45],
  popupAnchor: [0, -46]
});

const GetCurrentPosition = ({
  setGeofenceLat,
  setGeofenceLng,
  isShowButton,
  isShowSearch,
  latitude,
  longitude,
  searchResult
}) => {
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState();
  const [error, setError] = useState(null);
  const [geofenceData] = useGlobalState('geofenceData');
  const [allChildren] = useGlobalState('allChildren');
  const { childname } = useParams();
  const navigate = useNavigate();
  const zoom_level = 18;
  const radius = 100;
  const _created = (e) => console.log(e);

  useEffect(() => {
    const options = {
      enableHighAccuracy: true, // Request high accuracy for location
      timeout: 10000, // Maximum time (in milliseconds) for obtaining location
      maximumAge: 0 // Maximum age (in milliseconds) for a cached position
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([latitude || position.coords.latitude, longitude || position.coords.longitude]);
        },
        (err) => {
          setError(err.message);
        },
        options // Pass the options for geolocation
      );
    } else {
      setError('Geolocation is not available in this browser.');
    }
  }, [latitude, longitude]);

  function LeafletGeoSearch() {
    const map = useMap(); //here use useMap hook

    useEffect(() => {
      const provider = new OpenStreetMapProvider();

      const foundLocationIcon = new L.Icon({
        iconUrl: icon,
        iconSize: [30, 48],
        iconAnchor: [17, 45],
        popupAnchor: [0, -46]
      });

      const searchControl = new GeoSearchControl({
        provider,
        marker: { icon: foundLocationIcon },
        style: 'bar'
      });

      map.addControl(searchControl);

      return () => map.removeControl(searchControl);
    }, []);

    return null;
  }

  const showChildLocation = () => {
    if (map)
      map.flyTo([latitude, longitude], zoom_level, {
        animate: true
      });
  };

  let circle;
  function searchEventHandler(result) {
    setGeofenceLat(result.location.y); // latitude
    setGeofenceLng(result.location.x); // longitude
    if (circle !== undefined) {
      map.removeLayer(circle);
    }
    circle = L.circle([result.location.y, result.location.x], radius).addTo(map);
  }
  if (map) {
    map.on('geosearch/showlocation', searchEventHandler);
  }

  return (
    <div className="GetCurrentPosition">
      {error && <p>Error: {error}</p>}
      <button className="button is-success has-text-weight-semibold mb-2 mr-5" onClick={showChildLocation}>
        Locate Child
      </button>
      {isShowButton && (
        <button
          className="button is-success verdigris text-eerie-black has-text-weight-semibold mb-2"
          onClick={() => {
            navigate(`/parent/geofencing/${childname}`);
          }}
        >
          Pasang Geofence
        </button>
      )}
      {allChildren
        .filter((filteredChildren) => filteredChildren['username'] === childname)
        .map((child) => (
          <div key={child._id}>
            <div>
              <div>Nama anak: {child.username}</div>
              <div>
                Lokasi &emsp;&emsp;: {child.latitude}, {child.longitude}
              </div>
              {geofenceData !== null &&
              geofenceData.filter((geofencedChild) => geofencedChild['username'] === childname).length > 0 ? (
                geofenceData
                  .filter((geofencedChild) => geofencedChild['username'] === childname)
                  .map((geofencedChildData, index) => (
                    <div key={index}>
                      Jadwal &emsp;&nbsp;&ensp;: {geofencedChildData.start_time} - {geofencedChildData.end_time}
                    </div>
                  ))
              ) : (
                <div>Jadwal &emsp;&nbsp;&ensp;: Tidak ada jadwal</div>
              )}
            </div>
            <GeofencingLocation map={map} geofenceData={geofenceData} />
          </div>
        ))}
      <MapContainer
        center={userLocation || [-7.772635, 110.378682]}
        zoom={14}
        style={{ height: '480px', width: '100%' }}
        ref={setMap}
      >
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_created}
            draw={{ polyline: false, polygon: false, rectangle: false, circlemarker: false, marker: false }}
          />
        </FeatureGroup>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {searchResult && (
          <Marker position={[searchResult.lat, searchResult.lng]} icon={markerIcon}>
            <Popup>{searchResult.address}</Popup>
          </Marker>
        )}
        {userLocation && <Marker position={userLocation} icon={markerIcon} />}
        {isShowSearch && <LeafletGeoSearch />}
      </MapContainer>
    </div>
  );
};

export default GetCurrentPosition;
