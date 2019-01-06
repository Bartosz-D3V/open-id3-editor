import { combineReducers } from 'redux';
import filesReducer from '@reducers/files/filesReducer';
import notificationsReducer from '@reducers/notifications/notificationsReducer';

export default combineReducers({
  filesState: filesReducer,
  notificationsState: notificationsReducer,
});
