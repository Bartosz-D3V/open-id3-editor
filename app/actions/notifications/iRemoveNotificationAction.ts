import { Action } from 'redux';
import { NotificationsActionTypes } from './notificationsActionTypes';

export default interface IRemoveNotificationAction extends Action {
  type: NotificationsActionTypes.REMOVE_NOTIFICATION;
  payload: number;
}
