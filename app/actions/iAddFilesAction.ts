import { Action } from 'redux';
import { FilesActionTypes } from './filesActionTypes';

export default interface IAddFilesAction<T extends File> extends Action {
  type: FilesActionTypes.ADD_FILES;
  payload: Array<T>;
}
