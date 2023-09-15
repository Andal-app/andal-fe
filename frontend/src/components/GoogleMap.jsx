import { useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

export default function GoogleMaps() {
  const {} = useLoadScript({ googleMapsApiKey: '' });

  return <div>Map</div>;
}
