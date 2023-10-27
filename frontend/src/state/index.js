import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState } = createGlobalState({
  allChildren: []
});

export { useGlobalState };
