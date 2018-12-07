import { Action } from 'redux';
import { FilesActionTypes } from './filesActionTypes';

export default interface IGetFilesAction extends Action {
  type: FilesActionTypes.GET_FILES;
}
