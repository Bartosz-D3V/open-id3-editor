import { ActionCreator } from 'redux';
import { NotificationsActionTypes } from './notificationsActionTypes';
import IAddNotificationAction from './iAddNotificationAction';
import IRemoveNotificationAction from './iRemoveNotificationAction';
import IGetNotificationsAction from './iGetNotificationsAction';

export const getNotifications: ActionCreator<IGetNotificationsAction> = () => ({
  type: NotificationsActionTypes.GET_NOTIFICATIONS,
});

export const addNotification: ActionCreator<IAddNotificationAction> = (notification: string) => ({
  type: NotificationsActionTypes.ADD_NOTIFICATION,
  payload: notification,
});

export const removeNotification: ActionCreator<IRemoveNotificationAction> = (index: number) => ({
  type: NotificationsActionTypes.REMOVE_NOTIFICATION,
  payload: index,
});
