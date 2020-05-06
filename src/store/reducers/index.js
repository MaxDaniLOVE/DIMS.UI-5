import { FETCH_MEMBERS, ADD_MEMBER, EDIT_MEMBER, DELETE_USER, FETCH_TASKS } from '../actions/actionTypes';

const initialState = {
  members: [],
  tasks: [],
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
    case FETCH_TASKS:
      return {
        ...state,
        tasks: payload,
      };
    default:
      return state;
  }
};

export default reducer;
