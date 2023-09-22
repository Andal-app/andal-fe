import React, { Component } from 'react';

class OpenStreetMap extends Component {
  componentDidMount() {
    var map = L.map('map').setView(new L.LatLng(-7.772739, 110.378687), 16);
    L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=DsegarrBVEvk82IVCwHS', {
      attribution:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map);
  }

  render() {
    return <div id="map" style={{ width: '100%', height: '450px' }}></div>;
  }
}

export default OpenStreetMap;
