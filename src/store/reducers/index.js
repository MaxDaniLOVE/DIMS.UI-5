import { SET_ACTIVE_SERVICE, FETCH_MEMBERS } from '../actions/actionTypes';

const initialState = {
  service: 'firebase',
  members: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ACTIVE_SERVICE:
      return {
        ...state,
        service: payload,
      };
    case FETCH_MEMBERS:
      return {
        ...state,
        members: payload,
      };
    default:
      return state;
  }
};

export default reducer;
