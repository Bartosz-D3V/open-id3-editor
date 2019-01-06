import { Action } from 'redux';
import { FilesActionTypes } from './filesActionTypes';

export default interface IGetFileAction extends Action {
  type: FilesActionTypes.GET_FILE;
  payload: string;
}
