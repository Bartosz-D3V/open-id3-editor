import { Action } from 'redux';
import { ImageFile } from 'react-dropzone';
import { FilesActionTypes } from './filesActionTypes';

export default interface IAddFilesAction extends Action {
  type: FilesActionTypes.ADD_FILES;
  payload: Array<ImageFile>;
}
