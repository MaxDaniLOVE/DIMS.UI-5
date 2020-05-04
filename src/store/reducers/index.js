import { SET_ACTIVE_SERVICE } from '../actions/actionTypes';

const initialState = {
  service: 'firebase',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ACTIVE_SERVICE:
      return {
        ...state,
        service: payload,
      };
    default:
      return state;
  }
};

export default reducer;
