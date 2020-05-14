import {
  FETCH_MEMBERS,
  ADD_MEMBER,
  EDIT_MEMBER,
  DELETE_USER,
  FETCH_TASKS,
  FETCH_USER_TASKS,
  SET_USER_MARK,
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  FETCH_DATA_FAILURE,
  FETCH_DATA_START,
  SET_REGISTER_DATA,
} from '../actions/actionTypes';

const initialState = {
  members: [],
  tasks: [],
  userTasks: [],
  error: {},
  formData: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_MEMBERS:
      return {
        ...state,
        members: payload,
      };
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
    case SET_REGISTER_DATA:
      return {
        ...state,
        formData: payload,
      };
    case ADD_MEMBER:
    case EDIT_MEMBER:
    case DELETE_USER:
    case SET_USER_MARK:
    case ADD_TASK:
    case DELETE_TASK:
    case EDIT_TASK:
      return { ...state };
    case FETCH_DATA_START:
      return { ...state, error: {} };
    case FETCH_DATA_FAILURE:
      return { ...state, error: payload };
    default:
      return state;
  }
};

export default reducer;
