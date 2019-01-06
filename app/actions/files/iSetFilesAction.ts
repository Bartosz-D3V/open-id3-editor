import { Action } from 'redux';
import { UploadFile } from 'antd/lib/upload/interface';
import { FilesActionTypes } from './filesActionTypes';

export default interface ISetFilesAction extends Action {
  type: FilesActionTypes.SET_FILES;
  payload: Array<UploadFile>;
}
