import { ActionCreator } from 'redux';
import { ImageFile } from 'react-dropzone';
import { FilesActionTypes } from './filesActionTypes';
import IAddFilesAction from './iAddFilesAction';
import IGetFilesAction from './iGetFilesAction';

export const getFiles: ActionCreator<IGetFilesAction> = () => ({
  type: FilesActionTypes.GET_FILES,
});

export const addFiles: ActionCreator<IAddFilesAction> = (files: Array<ImageFile>) => ({
  payload: files,
  type: FilesActionTypes.ADD_FILES,
});
