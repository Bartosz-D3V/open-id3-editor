import { INotificationsState } from '@states/iNotificationsState';
import { NotificationsAction } from '@actions/notifications/notificationsAction';
import { NotificationsActionTypes } from '@actions/notifications/notificationsActionTypes';

const initialState: INotificationsState = {
  notifications: [],
};

export default (state = initialState, action: NotificationsAction): INotificationsState => {
  switch (action.type) {
    case NotificationsActionTypes.GET_NOTIFICATIONS:
    default:
      return {
        ...state,
        notifications: state.notifications,
      };
    case NotificationsActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications:
          state.notifications.length > 2
            ? state.notifications.splice(0).concat(action.payload)
            : state.notifications.concat(action.payload),
      };
    case NotificationsActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.splice(action.payload),
      };
  }
};
