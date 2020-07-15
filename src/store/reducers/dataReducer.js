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
  THROW_ALERT,
  FETCH_DATA_START,
  SET_FORM_DATA,
  SET_ASSIGNED_MEMBERS,
  GET_USER_PROGRESS,
  DELETE_USER_PROGRESS,
  EDIT_USER_PROGRESS,
  TOGGLE_DARK_MODE,
  SEND_MAIL,
  REORDER_TABLE,
} from '../actions/actionTypes';
import { loadCache } from '../../utils/cache';

const isDarkMode = !!loadCache('isDarkMode');

const initialState = {
  members: [],
  tasks: [],
  userTasks: [],
  alert: {},
  formData: {},
  assignedMembers: [],
  progress: [],
  isDarkMode,
};

const dataReducer = (state = initialState, { type, payload }) => {
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
    case SET_FORM_DATA:
      return {
        ...state,
        formData: payload,
      };
    case GET_USER_PROGRESS:
      return {
        ...state,
        progress: payload,
      };
    case FETCH_DATA_START:
      return { ...state, alert: {} };
    case THROW_ALERT:
      return { ...state, alert: payload };
    case SET_ASSIGNED_MEMBERS:
      return { ...state, assignedMembers: payload };
    case TOGGLE_DARK_MODE:
      return { ...state, isDarkMode: payload };
    case REORDER_TABLE:
      const { table, result } = payload;
      return { ...state, [table]: result };
    case ADD_MEMBER:
    case EDIT_MEMBER:
    case DELETE_USER:
    case SET_USER_MARK:
    case ADD_TASK:
    case DELETE_TASK:
    case DELETE_USER_PROGRESS:
    case EDIT_USER_PROGRESS:
    case EDIT_TASK:
    case SEND_MAIL:
    default:
      return state;
  }
};

export default dataReducer;
