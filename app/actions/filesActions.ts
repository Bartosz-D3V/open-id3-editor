import { ActionCreator } from 'redux';
import { FilesActionTypes } from './filesActionTypes';
import IAddFilesAction from './iAddFilesAction';
import IGetFilesAction from './iGetFilesAction';

export const getFiles: ActionCreator<IGetFilesAction> = () => ({
  type: FilesActionTypes.GET_FILES,
});

export const addFiles: ActionCreator<IAddFilesAction<File>> = <T extends File>(
  files: Array<T>
) => ({
  payload: files,
  type: FilesActionTypes.ADD_FILES,
});
