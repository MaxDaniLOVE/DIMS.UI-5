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
  SET_FORM_DATA,
  SET_ASSIGNED_MEMBERS,
  GET_USER_PROGRESS,
  DELETE_USER_PROGRESS,
  EDIT_USER_PROGRESS,
  TOGGLE_DARK_MODE,
  SEND_MAIL,
  REORDER_TABLE,
  REMOVE_ALERT,
} from '../actions/actionTypes';
import { loadCache } from '../../utils/cache';
import getRandomId from '../../utils/getRandomId';

const isDarkMode = !!loadCache('isDarkMode');

const initialState = {
  members: [],
  tasks: [],
  userTasks: [],
  alerts: [],
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
    case THROW_ALERT:
      return { ...state, alerts: [...state.alerts, { ...payload, id: getRandomId() }] };
    case SET_ASSIGNED_MEMBERS:
      return { ...state, assignedMembers: payload };
    case TOGGLE_DARK_MODE:
      return { ...state, isDarkMode: payload };
    case REORDER_TABLE:
      const { table, result } = payload;
      return { ...state, [table]: result };
    case REMOVE_ALERT:
      return { ...state, alerts: payload };
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
