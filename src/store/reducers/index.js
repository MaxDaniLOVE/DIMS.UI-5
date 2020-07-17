import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dataReducer from './dataReducer';
import sortReducer from './sortReducer';

export default combineReducers({
  auth: authReducer,
  data: dataReducer,
  sort: sortReducer,
});
