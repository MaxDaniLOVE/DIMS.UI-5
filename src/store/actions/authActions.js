import {
  AUTH_LOG_IN,
  CHANGE_AUTH_STATUS,
  AUTH_LOG_OUT,
  AUTH_REGISTER,
  AUTH_STARTED,
  AUTH_ENDED,
  CHANGE_PASSWORD,
} from './actionTypes';
import Authentication from '../../services/Authentication';
import { defaultErrorCallback, successCallback } from './alertsActions';

const auth = new Authentication();

const errorCallback = (dispatch, error) => {
  defaultErrorCallback(dispatch, error);
  dispatch(endAuth());
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
    dispatch(endAuth());
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

const startAuth = () => {
  return { type: AUTH_STARTED };
};

const endAuth = () => {
  return { type: AUTH_ENDED };
};

const changePassword = (password) => {
  return async (dispatch) => {
    try {
      await auth.changePass(password);
      dispatch({
        type: CHANGE_PASSWORD,
      });
      successCallback(dispatch, 'Successfully updated!');
    } catch (error) {
      errorCallback(dispatch, error);
    }
  };
};

export { logIn, changeStatus, logOut, registerUser, startAuth, endAuth, changePassword };
