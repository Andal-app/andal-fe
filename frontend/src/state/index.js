import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState } = createGlobalState({
  isLogin: false
});

export { useGlobalState };
