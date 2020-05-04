import { SET_ACTIVE_SERVICE } from './actionTypes';

const setActiveService = (service) => {
  return {
    type: SET_ACTIVE_SERVICE,
    payload: service,
  };
};

export { setActiveService };
