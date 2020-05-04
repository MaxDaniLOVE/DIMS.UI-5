import { FETCH_MEMBERS } from './actionTypes';
import Azure from '../../services/Azure';

const api = new Azure();

const getUsers = () => {
  return async (dispatch) => {
    try {
      const users = await api.getMembers();
      dispatch({
        type: FETCH_MEMBERS,
        payload: users,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export { getUsers };
