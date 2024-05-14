import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MapPinImg from '../../assets/images/map_pin.png';

const icon = L.icon({
  iconUrl: MapPinImg,
  iconSize: [38, 38]
});

const position = [51.505, -0.09];

export default function Maps() {
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ width: '100%', height: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=fpDlF5YXcAYQ19hRzNed"
      />

      <Marker position={position} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
