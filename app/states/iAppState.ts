import { IFilesState } from './iFilesState';
import { INotificationsState } from './iNotificationsState';

export interface IAppState {
  filesState: IFilesState;
  notificationsState: INotificationsState;
}
