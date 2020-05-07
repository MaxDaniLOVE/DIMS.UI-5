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
} from './actionTypes';
import initializeService from '../../utils/initializeService';

const getUsers = () => {
  return async (dispatch) => {
    const api = initializeService();
    try {
      const users = await api.getUsersData();
      dispatch({
        type: FETCH_MEMBERS,
        payload: users,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

const addUser = (user) => {
  return async (dispatch) => {
    const api = initializeService();
    try {
      await api.addNewUser(user);
      dispatch({
        type: ADD_MEMBER,
      });
      dispatch(getUsers());
    } catch (error) {
      console.error(error);
    }
  };
};

const editUser = (user) => {
  return async (dispatch) => {
    const api = initializeService();
    try {
      await api.editUserData(user);
      dispatch({
        type: EDIT_MEMBER,
      });
      dispatch(getUsers());
    } catch (error) {
      console.error(error);
    }
  };
};

const deleteUser = (id) => {
  return async (dispatch) => {
    const api = initializeService();
    try {
      await api.deleteUser(id);
      dispatch({
        type: DELETE_USER,
      });
      dispatch(getUsers());
    } catch (error) {
      console.error(error);
    }
    await dispatch(getUsers());
  };
};

const getTasks = () => {
  return async (dispatch) => {
    const api = initializeService();
    try {
      const tasks = await api.getAllTasks();
      dispatch({
        type: FETCH_TASKS,
        payload: tasks,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

const getUserTasks = (id) => {
  return async (dispatch) => {
    const api = initializeService();
    try {
      const userTasks = await api.getUsersTasks(id);
      dispatch({
        type: FETCH_USER_TASKS,
        payload: userTasks,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

const setMark = (state, userTaskId, taskId, userId) => {
  return async (dispatch) => {
    const api = initializeService();
    try {
      await api.onSetUserMark(state, userTaskId, taskId, userId);
      dispatch({
        type: SET_USER_MARK,
      });
      dispatch(getUserTasks(userId));
    } catch (error) {
      console.error(error);
    }
  };
};

const addTask = (task) => {
  return async (dispatch) => {
    const api = initializeService();
    try {
      await api.addNewTask(task);
      dispatch({
        type: ADD_TASK,
      });
      dispatch(getTasks());
    } catch (error) {
      console.error(error);
    }
  };
};

const deleteTask = (task) => {
  return async (dispatch) => {
    const api = initializeService();
    try {
      await api.deleteTask(task);
      dispatch({
        type: DELETE_TASK,
      });
      dispatch(getTasks());
    } catch (error) {
      console.error(error);
    }
  };
};

export { getUsers, addUser, editUser, deleteUser, getTasks, getUserTasks, setMark, addTask, deleteTask };
