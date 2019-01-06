import { Action } from 'redux';
import { FilesActionTypes } from './filesActionTypes';

export default interface ISelectFileAction extends Action {
  type: FilesActionTypes.SELECT_FILE;
  payload: string;
}
