import React, { Component } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import OpenStreetMap from './OpenStreetMap';
import 'leaflet/dist/leaflet.css';

class GeofencingAlgorithm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [-7.772739, 110.378687], // Initial map center coordinates
      zoom: 17, // Initial zoom level
      geofence: {
        center: [-7.772739, 110.378687], // Geofence center coordinates
        radius: 100 // Geofence radius in meters
      },
      isInsideGeofence: false // Flag to track if the user is inside the geofence
    };
  }

  // Add your geofencing logic here
  // You can use the Leaflet map events, such as 'locationfound' or 'move', to check if the user is inside the geofence.

  render() {
    const { center, zoom, geofence, isInsideGeofence } = this.state;

    return (
      <div className="map-container">
        <MapContainer center={center} zoom={zoom} style={{ height: '500px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Circle center={geofence.center} radius={geofence.radius} pathOptions={{ color: 'blue' }} />
        </MapContainer>
        <div className="geofence-status">
          {isInsideGeofence ? <p>You are inside the geofence.</p> : <p>You are outside the geofence.</p>}
        </div>
      </div>
    );
  }
}

export default GeofencingAlgorithm;
