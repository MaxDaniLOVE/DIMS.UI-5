import { SET_ACTIVE_SERVICE } from './actionTypes';

const setActiveService = (event) => {
  const {
    target: { value, checked },
  } = event;
  const payload = checked ? value : 'firebase';
  return {
    type: SET_ACTIVE_SERVICE,
    payload,
  };
};

export { setActiveService };
