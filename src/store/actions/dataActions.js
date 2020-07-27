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
import { addCache, removeCacheItemByKey } from '../../utils/cache';
import { addDragNDropCache, sortCachedData } from '../../utils/dragAndDropHelpers';
import Heroku from '../../services/Heroku';
import { registerUser } from './authActions';
import { defaultErrorCallback as errorCallback, successCallback } from './alertsActions';
import { resetSort, sortData, filterData } from './sortActions';
import addAgeFieldToUsers from '../../utils/addAgeFieldToUsers';

const api = initializeService();

const sortingCallback = (dispatch, getState, sortTableId) => {
  const {
    sort: { isSorted, sortInfo, filterInfo, isFiltered },
  } = getState();
  if (isSorted) {
    const { type, id } = sortInfo;
    dispatch(sortData(sortTableId, id, type, true));
  }
  if (isFiltered) {
    dispatch(filterData(sortTableId, filterInfo));
  }
};

const getUsers = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingData());
    try {
      const users = await api.getUsersData();
      const usersWithAgeData = addAgeFieldToUsers(users);
      const sortedUsers = sortCachedData('members', usersWithAgeData);
      dispatch({
        type: FETCH_MEMBERS,
        payload: sortedUsers,
      });
      sortingCallback(dispatch, getState, 'members');
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
  return async (dispatch, getState) => {
    dispatch(startFetchingData());
    try {
      const tasks = await api.getAllTasks();
      const sortedTasks = sortCachedData('tasks', tasks);
      dispatch({
        type: FETCH_TASKS,
        payload: sortedTasks,
      });
      sortingCallback(dispatch, getState, 'tasks');
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const getUserTasks = (id) => {
  return async (dispatch, getState) => {
    dispatch(startFetchingData());
    try {
      const userTasks = await api.getUsersTasks(id);
      const sortedUserTasks = sortCachedData(`userTasks_${id}`, userTasks);
      dispatch({
        type: FETCH_USER_TASKS,
        payload: sortedUserTasks,
      });
      sortingCallback(dispatch, getState, 'userTasks');
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
  return async (dispatch, getState) => {
    dispatch(startFetchingData());
    try {
      const userProgress = await api.getUsersProgress(id);
      const sortedProgress = sortCachedData(`progress_${id}`, userProgress);
      dispatch({
        type: GET_USER_PROGRESS,
        payload: sortedProgress,
      });
      sortingCallback(dispatch, getState, 'progress');
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

const reorderTable = (table, list, startIndex, endIndex, userId) => {
  return (dispatch, getStore) => {
    const {
      sort: { isSorted },
    } = getStore();

    if (isSorted) {
      dispatch(resetSort());
    }

    const arrayOfData = Array.from(list);

    const removed = arrayOfData[startIndex];
    const updatedArray = [...arrayOfData.slice(0, startIndex), ...arrayOfData.slice(startIndex + 1)];
    const result = [...updatedArray.slice(0, endIndex), removed, ...updatedArray.slice(endIndex)];

    addDragNDropCache(table, result, userId);

    dispatch({ type: REORDER_TABLE, payload: { result, table } });
  };
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
