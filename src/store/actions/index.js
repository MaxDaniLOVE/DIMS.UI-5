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
} from './actionTypes';
import initializeService from '../../utils/initializeService';

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
      const { message } = error;
      dispatch(fetchingDataFailed({ message }));
    }
  };
};

const addUser = (user) => {
  return async (dispatch) => {
    try {
      await api.addNewUser(user);
      dispatch({
        type: ADD_MEMBER,
      });
      dispatch(getUsers());
    } catch (error) {
      const { message } = error;
      dispatch(fetchingDataFailed({ message }));
    }
  };
};

const editUser = (user) => {
  return async (dispatch) => {
    try {
      await api.editUserData(user);
      dispatch({
        type: EDIT_MEMBER,
      });
      dispatch(getUsers());
    } catch (error) {
      const { message } = error;
      dispatch(fetchingDataFailed({ message }));
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
    } catch (error) {
      const { message } = error;
      dispatch(fetchingDataFailed({ message }));
    }
    await dispatch(getUsers());
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
      const { message } = error;
      dispatch(fetchingDataFailed({ message }));
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
      const { message } = error;
      dispatch(fetchingDataFailed({ message }));
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
      const { message } = error;
      dispatch(fetchingDataFailed({ message }));
    }
  };
};

const addTask = (task, assignedMembers) => {
  return async (dispatch) => {
    try {
      const response = await api.addNewTask(task, assignedMembers);
      dispatch({
        type: ADD_TASK,
      });
      dispatch(getTasks());
      return response;
    } catch (error) {
      const { message } = error;
      dispatch(fetchingDataFailed({ message }));
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
    } catch (error) {
      const { message } = error;
      dispatch(fetchingDataFailed({ message }));
    }
  };
};

const editTask = (newTask, assignedMembers) => {
  return async (dispatch) => {
    try {
      await api.editTask(newTask, assignedMembers);
      dispatch({
        type: EDIT_TASK,
      });
      dispatch(getTasks());
    } catch (error) {
      const { message } = error;
      dispatch(fetchingDataFailed({ message }));
    }
  };
};

const startFetchingData = () => ({ type: FETCH_DATA_START });

const fetchingDataFailed = (error) => ({ type: FETCH_DATA_FAILURE, payload: error });

export { getUsers, addUser, editUser, deleteUser, getTasks, getUserTasks, setMark, addTask, deleteTask, editTask };
