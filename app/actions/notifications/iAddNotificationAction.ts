import { Action } from 'redux';
import { NotificationsActionTypes } from './notificationsActionTypes';

export default interface IAddNotificationAction extends Action {
  type: NotificationsActionTypes.ADD_NOTIFICATION;
  payload: string;
}
