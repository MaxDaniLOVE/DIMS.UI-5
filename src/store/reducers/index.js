import { FETCH_MEMBERS } from '../actions/actionTypes';

const initialState = {
  members: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
