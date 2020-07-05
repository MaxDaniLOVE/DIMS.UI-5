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
  ADD_USER_PROGRESS,
  TOGGLE_DARK_MODE,
  SEND_MAIL,
  REORDER_TABLE,
} from './actionTypes';
import initializeService from '../../utils/initializeService';
import { stringToDate } from '../../utils/convertDate';
import sortFromOldToNew from '../../utils/sortFromOldToNew';
import { addCache, removeCacheItemByKey } from '../../utils/cache';
import Heroku from '../../services/Heroku';
import { registerUser } from './authActions';
import { defaultErrorCallback as errorCallback, successCallback } from './alertsActions';

const api = initializeService();

const getUsers = () => {
  return async (dispatch) => {
    dispatch(startFetchingData());
    try {
      const users = await api.getUsersData();
      dispatch({
        type: FETCH_MEMBERS,
        payload: users,
      });
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const addUser = () => {
  return async (dispatch, getState) => {
    try {
      const {
        data: { formData },
      } = getState();
      const { birthDate, startDate, email, name } = formData; // TODO add helper
      const registrationData = { email, password: process.env.REACT_APP_DEFAULT_PASS, name };
      const newUser = { ...formData, birthDate: stringToDate(birthDate), startDate: stringToDate(startDate) };
      await api.addNewUser(newUser);
      dispatch({
        type: ADD_MEMBER,
      });
      dispatch(registerUser(registrationData));
      dispatch(getUsers());
      successCallback(dispatch, 'User was successfully added!');
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const editUser = () => {
  return async (dispatch, getState) => {
    try {
      const {
        data: { formData },
      } = getState();
      const { birthDate, startDate } = formData; // TODO add helper
      const newUser = { ...formData, birthDate: stringToDate(birthDate), startDate: stringToDate(startDate) };
      await api.editUserData(newUser);
      dispatch({
        type: EDIT_MEMBER,
      });
      dispatch(getUsers());
      successCallback(dispatch, 'User was successfully updated!');
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      await api.deleteUser(id);
      dispatch({
        type: DELETE_USER,
      });
      dispatch(getUsers());
      successCallback(dispatch, 'User was successfully deleted!');
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const getTasks = () => {
  return async (dispatch) => {
    dispatch(startFetchingData());
    try {
      const tasks = await api.getAllTasks();
      dispatch({
        type: FETCH_TASKS,
        payload: tasks,
      });
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const getUserTasks = (id) => {
  return async (dispatch) => {
    dispatch(startFetchingData());
    try {
      const userTasks = await api.getUsersTasks(id);
      dispatch({
        type: FETCH_USER_TASKS,
        payload: userTasks,
      });
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const setMark = (state, userTaskId, taskId, userId) => {
  return async (dispatch) => {
    try {
      await api.onSetUserMark(state, userTaskId, taskId, userId);
      dispatch({
        type: SET_USER_MARK,
      });
      dispatch(getUserTasks(userId));
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const addTask = () => {
  return async (dispatch, getState) => {
    try {
      const {
        data: { formData, assignedMembers },
      } = getState();
      const { deadlineDate, startDate } = formData; // TODO add helper
      const newTask = { ...formData, deadlineDate: stringToDate(deadlineDate), startDate: stringToDate(startDate) };
      const response = await api.addNewTask(newTask, assignedMembers);
      dispatch({
        type: ADD_TASK,
      });
      dispatch(getTasks());
      successCallback(dispatch, 'Task was successfully added!');
      return response;
    } catch (error) {
      errorCallback(dispatch, error);
      return error;
    }
  };
};

const deleteTask = (task) => {
  return async (dispatch) => {
    try {
      await api.deleteTask(task);
      dispatch({
        type: DELETE_TASK,
      });
      dispatch(getTasks());
      successCallback(dispatch, 'Task was successfully deleted!');
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const editTask = () => {
  return async (dispatch, getState) => {
    try {
      const {
        data: { formData, assignedMembers },
      } = getState();
      const { deadlineDate, startDate } = formData; // TODO add helper
      const newTask = { ...formData, deadlineDate: stringToDate(deadlineDate), startDate: stringToDate(startDate) };
      await api.editTask(newTask, assignedMembers);
      dispatch({
        type: EDIT_TASK,
      });
      dispatch(getTasks());
      successCallback(dispatch, 'Task was successfully edited!');
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const startFetchingData = () => {
  return { type: FETCH_DATA_START };
};

const throwAlert = (alert) => {
  return { type: THROW_ALERT, payload: alert };
};

const setFormData = (data) => {
  return { type: SET_FORM_DATA, payload: data };
};

const setAssignedMembers = (members) => {
  return { type: SET_ASSIGNED_MEMBERS, payload: members };
};

const getUserProgress = (id) => {
  return async (dispatch) => {
    dispatch(startFetchingData());
    try {
      const userProgress = await api.getUsersProgress(id);
      const sortedProgress = sortFromOldToNew(userProgress);
      dispatch({
        type: GET_USER_PROGRESS,
        payload: sortedProgress,
      });
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const deleteUserProgress = (subtaskId, userId) => {
  return async (dispatch) => {
    try {
      await api.deleteSubtask(subtaskId);
      dispatch({
        type: DELETE_USER_PROGRESS,
      });
      dispatch(getUserProgress(userId));
      successCallback(dispatch, 'Subtask was successfully deleted!');
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const editUserProgress = () => {
  return async (dispatch, getState) => {
    try {
      const {
        data: { formData },
      } = getState();
      const { trackDate, userId } = formData; // TODO add helper
      const newTask = { ...formData, trackDate: stringToDate(trackDate) };
      await api.editUserProgress(newTask);
      dispatch({
        type: EDIT_USER_PROGRESS,
      });
      dispatch(getUserProgress(userId));
      successCallback(dispatch, 'Subtask was successfully edited!');
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const addUserProgress = () => {
  return async (dispatch, getState) => {
    try {
      const {
        data: { formData },
      } = getState();
      const { trackDate, userId } = formData; // TODO add helper
      const newTask = { ...formData, trackDate: stringToDate(trackDate) };
      await api.addNewSubtask(newTask);
      dispatch({
        type: ADD_USER_PROGRESS,
      });
      dispatch(getUserProgress(userId));
      successCallback(dispatch, 'Subtask was successfully added!');
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const switchDarkMode = ({ target: { checked } }) => {
  if (checked) {
    addCache('isDarkMode', checked);
  } else {
    removeCacheItemByKey('isDarkMode');
  }
  return { type: TOGGLE_DARK_MODE, payload: checked };
};

const getAssignedMembers = (taskId) => {
  return async (dispatch) => {
    dispatch(startFetchingData());
    try {
      const users = await api.getAssignedUsers(taskId);
      dispatch(setAssignedMembers(users));
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const sendMail = (mailData) => {
  return async (dispatch) => {
    dispatch(startFetchingData());
    try {
      const sendMailApi = api instanceof Heroku ? api : new Heroku();
      await sendMailApi.sendMail(mailData);
      dispatch({
        type: SEND_MAIL,
      });
      successCallback(dispatch, 'Message was send!');
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const reorderTable = (table, list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return { type: REORDER_TABLE, payload: { result, table } };
};

export {
  getUsers,
  addUser,
  editUser,
  deleteUser,
  getTasks,
  getUserTasks,
  setMark,
  addTask,
  deleteTask,
  editTask,
  setFormData,
  setAssignedMembers,
  getUserProgress,
  deleteUserProgress,
  editUserProgress,
  addUserProgress,
  throwAlert,
  switchDarkMode,
  getAssignedMembers,
  sendMail,
  reorderTable,
};
