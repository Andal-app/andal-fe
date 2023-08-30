import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState } = createGlobalState({
  showVerifModal: {
    id: null,
    show: false
  },
  showTimelineModal: {
    id: null,
    show: false
  },
  cutiData: [],
  isVerifiedAtasan: false,
  isVerifiedKadis: false,
  isVerifiedKepegawaian: false,
  isLogin: false
});

export { useGlobalState };
