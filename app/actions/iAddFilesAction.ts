import { Action } from 'redux';
import { FilesActionTypes } from './filesActionTypes';
import { ImageFile } from 'react-dropzone';

export default interface IAddFilesAction extends Action {
  type: FilesActionTypes.ADD_FILES;
  payload: Array<ImageFile>;
}
