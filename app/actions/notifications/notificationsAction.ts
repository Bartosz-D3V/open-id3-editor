import IAddNotificationAction from '@actions/notifications/iAddNotificationAction';
import IRemoveNotificationAction from '@actions/notifications/iRemoveNotificationAction';
import IGetNotificationsAction from '@actions/notifications/iGetNotificationsAction';

export type NotificationsAction =
  | IAddNotificationAction
  | IRemoveNotificationAction
  | IGetNotificationsAction;
