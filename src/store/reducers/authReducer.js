import { AUTH_LOG_IN, CHANGE_AUTH_STATUS, AUTH_LOG_OUT, AUTH_STARTED, AUTH_ENDED } from '../actions/actionTypes';

const initialState = {
  isAuthStarted: true,
  isLoggedIn: false,
  user: {},
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_LOG_IN:
    case AUTH_LOG_OUT:
      return state;
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
    default:
      return state;
  }
};

export default authReducer;
