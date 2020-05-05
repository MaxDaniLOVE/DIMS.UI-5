import { FETCH_MEMBERS, ADD_MEMBER, EDIT_MEMBER, DELETE_USER } from './actionTypes';
import Azure from '../../services/Azure';
import { loadCache } from '../../utils/cache';
import Firebase from '../../services/Firebase';

const getUsers = () => {
  return async (dispatch) => {
    const service = loadCache('service');
    const api = service === 'azure' ? new Azure() : new Firebase();
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
    const service = loadCache('service');
    const api = service === 'azure' ? new Azure() : new Firebase();
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
    const service = loadCache('service');
    const api = service === 'azure' ? new Azure() : new Firebase();
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
    const service = loadCache('service');
    const api = service === 'azure' ? new Azure() : new Firebase();
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

export { getUsers, addUser, editUser, deleteUser };