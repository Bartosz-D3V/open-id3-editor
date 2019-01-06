import { Action } from 'redux';
import { UploadFile } from 'antd/lib/upload/interface';
import { FilesActionTypes } from './filesActionTypes';

export default interface IAddFilesAction extends Action {
  type: FilesActionTypes.ADD_FILES;
  payload: Array<UploadFile>;
}
