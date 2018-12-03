import { ImageFile } from 'react-dropzone';
import { FilesActionTypes } from './filesActionTypes';

export interface FilesAction {
  files?: Array<ImageFile>;
  type: FilesActionTypes;
  addFiles?: Function;
  getFiles?: Function;
}
