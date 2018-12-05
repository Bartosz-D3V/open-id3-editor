import { FilesActionTypes } from './filesActionTypes';
import { ImageFile } from 'react-dropzone';

export const addFiles = (files: Array<ImageFile>) => ({
  files,
  type: FilesActionTypes.ADD_FILES,
});
export const getFiles = () => ({ type: FilesActionTypes.GET_FILES });
