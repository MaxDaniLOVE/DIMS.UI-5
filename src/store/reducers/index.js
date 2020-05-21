import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dataReducer from './dataReducer';

export default combineReducers({
  user: authReducer,
  data: dataReducer,
});
