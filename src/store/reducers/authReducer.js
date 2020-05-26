import { AUTH_LOG_IN, CHANGE_AUTH_STATUS, AUTH_LOG_OUT } from '../actions/actionTypes';

const initialState = {
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
    default:
      return state;
  }
};

export default authReducer;
