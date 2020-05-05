import { FETCH_MEMBERS, ADD_MEMBER } from '../actions/actionTypes';

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
    case ADD_MEMBER:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
