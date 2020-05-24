import { AUTH_LOG_IN, CHANGE_AUTH_STATUS, AUTH_LOG_OUT, AUTH_REGISTER } from './actionTypes';
import Authentication from '../../services/Authentication';
import { throwAlert } from './dataActions';

const auth = new Authentication();

const errorCallback = (dispatch, error) => {
  const { message } = error;
  dispatch(throwAlert({ type: 'ERROR', message }));
};

const logIn = (authData) => {
  return async (dispatch) => {
    try {
      await auth.login(authData);
      dispatch({
        type: AUTH_LOG_IN,
      });
      dispatch(changeStatus());
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const changeStatus = () => {
  return async (dispatch) => {
    try {
      const userStatus = await auth.onStatusChanged();
      const { isLoggedIn, role, email, userId, userName } = userStatus;
      let user = isLoggedIn ? { role, email } : {};
      if (role === 'USER') {
        user = { ...user, userId, userName };
      }
      dispatch({
        type: CHANGE_AUTH_STATUS,
        payload: { user, isLoggedIn },
      });
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const logOut = () => {
  return async (dispatch) => {
    try {
      await auth.logout();
      dispatch({
        type: AUTH_LOG_OUT,
      });
      dispatch(changeStatus());
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

const registerUser = (authData) => {
  return async (dispatch) => {
    try {
      await auth.registerNewUser(authData);
      dispatch({
        type: AUTH_REGISTER,
      });
      dispatch(changeStatus());
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};
export { logIn, changeStatus, logOut, registerUser };
