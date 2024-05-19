import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorsReducer from './errorsReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer
});
