import { FilesActionTypes } from './filesActionTypes';
import { ImageFile } from 'react-dropzone';
import { ActionCreator } from 'redux';
import { IAddFilesAction } from './IAddFilesAction';
import { IGetFilesAction } from './IGetFilesAction';

export const getFiles: ActionCreator<IGetFilesAction> = () => ({
  type: FilesActionTypes.GET_FILES,
});

export const addFiles: ActionCreator<IAddFilesAction> = (files: Array<ImageFile>) => ({
  payload: files,
  type: FilesActionTypes.ADD_FILES,
});
