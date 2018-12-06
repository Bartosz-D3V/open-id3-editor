import { Action } from 'redux';
import { FilesActionTypes } from './filesActionTypes';
import { ImageFile } from 'react-dropzone';

export interface IAddFilesAction extends Action {
  type: FilesActionTypes.ADD_FILES;
  payload: Array<ImageFile>;
}
