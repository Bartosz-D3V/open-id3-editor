import { ActionCreator } from 'redux';
import { UploadFile } from 'antd/lib/upload/interface';
import { FilesActionTypes } from './filesActionTypes';
import IAddFilesAction from './iAddFilesAction';
import IGetFilesAction from './iGetFilesAction';

export const getFiles: ActionCreator<IGetFilesAction> = () => ({
  type: FilesActionTypes.GET_FILES,
});

export const addFiles: ActionCreator<IAddFilesAction> = (files: Array<UploadFile>) => ({
  payload: files,
  type: FilesActionTypes.ADD_FILES,
});
