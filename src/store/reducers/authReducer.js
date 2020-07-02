import {
  AUTH_LOG_IN,
  CHANGE_AUTH_STATUS,
  AUTH_LOG_OUT,
  AUTH_STARTED,
  AUTH_ENDED,
  CHANGE_PASSWORD,
  AUTH_LOG_IN_GITHUB,
  AUTH_LOG_IN_FACEBOOK,
} from '../actions/actionTypes';

const initialState = {
  isAuthStarted: true,
  isLoggedIn: false,
  user: {},
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_AUTH_STATUS:
      const { isLoggedIn, user } = payload;
      return {
        ...state,
        isLoggedIn,
        user,
      };
    case AUTH_STARTED:
      return { ...state, isAuthStarted: true };
    case AUTH_ENDED:
      return { ...state, isAuthStarted: false };
    case AUTH_LOG_IN:
    case AUTH_LOG_OUT:
    case CHANGE_PASSWORD:
    case AUTH_LOG_IN_GITHUB:
    case AUTH_LOG_IN_FACEBOOK:
    default:
      return state;
  }
};

export default authReducer;
