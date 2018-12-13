import { ActionCreator } from 'redux';
import { FilesActionTypes } from './filesActionTypes';
import IAddFilesAction from './iAddFilesAction';
import IGetFilesAction from './iGetFilesAction';
import { UploadFile } from 'antd/lib/upload/interface';

export const getFiles: ActionCreator<IGetFilesAction> = () => ({
  type: FilesActionTypes.GET_FILES,
});

export const addFiles: ActionCreator<IAddFilesAction> = (files: Array<UploadFile>) => ({
  payload: files,
  type: FilesActionTypes.ADD_FILES,
});
