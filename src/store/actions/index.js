import { SET_ACTIVE_SERVICE, FETCH_MEMBERS } from './actionTypes';
import Azure from '../../services/Azure';

const api = new Azure();

const setActiveService = (event) => {
  const {
    target: { value, checked },
  } = event;
  const payload = checked ? value : 'firebase';
  return {
    type: SET_ACTIVE_SERVICE,
    payload,
  };
};

const getUsers = () => {
  return async (dispatch) => {
    try {
      const users = await api.getMembers();
      console.log(
        dispatch({
          type: FETCH_MEMBERS,
          payload: users,
        }),
      );
      dispatch({
        type: FETCH_MEMBERS,
        payload: users,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export { setActiveService, getUsers };
