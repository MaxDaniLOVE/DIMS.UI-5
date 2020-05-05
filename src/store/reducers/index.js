import { FETCH_MEMBERS, ADD_MEMBER, EDIT_MEMBER, DELETE_USER } from '../actions/actionTypes';

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
    case EDIT_MEMBER:
      return { ...state };
    case DELETE_USER: {
      return { ...state };
    }
    default:
      return state;
  }
};

export default reducer;
