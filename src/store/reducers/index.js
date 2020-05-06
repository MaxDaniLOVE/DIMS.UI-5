import {
  FETCH_MEMBERS,
  ADD_MEMBER,
  EDIT_MEMBER,
  DELETE_USER,
  FETCH_TASKS,
  FETCH_USER_TASKS,
  SET_USER_MARK,
} from '../actions/actionTypes';

const initialState = {
  members: [],
  tasks: [],
  userTasks: [],
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
    case FETCH_USER_TASKS:
      return {
        ...state,
        userTasks: payload,
      };
    case SET_USER_MARK:
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
