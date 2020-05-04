import { FETCH_MEMBERS } from './actionTypes';
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

export { getUsers };
