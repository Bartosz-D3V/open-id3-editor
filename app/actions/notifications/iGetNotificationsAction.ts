import { Action } from 'redux';
import { NotificationsActionTypes } from './notificationsActionTypes';

export default interface IGetNotificationsAction extends Action {
  type: NotificationsActionTypes.GET_NOTIFICATIONS;
}
