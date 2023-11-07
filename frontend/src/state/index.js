import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState } = createGlobalState({
  allChildren: [],
  child: [],
  geofenceData: [],
  latitude: 0.0,
  longitude: 0.0,
  specificChild: [
    {
      username: '',
      latitude: 0.0,
      longitude: 0.0
    }
  ]
});

export { useGlobalState };
