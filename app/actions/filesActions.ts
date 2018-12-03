import { FilesActionTypes } from './filesActionTypes';
import { ImageFile } from 'react-dropzone';
import { FilesAction } from './filesAction';

export const addFiles = (files: Array<ImageFile>): FilesAction => ({
  files,
  type: FilesActionTypes.ADD_FILES,
});
export const getFiles = (): FilesAction => ({ type: FilesActionTypes.GET_FILES });
