import { ActionCreator } from 'redux';
import { UploadFile } from 'antd/lib/upload/interface';
import { FilesActionTypes } from './filesActionTypes';
import ISetFilesAction from './iSetFilesAction';
import IAddFilesAction from './iAddFilesAction';
import IGetFilesAction from './iGetFilesAction';
import ISelectFileAction from './iSelectFileAction';
import IGetFileAction from './iGetFileAction';

export const getFiles: ActionCreator<IGetFilesAction> = () => ({
  type: FilesActionTypes.GET_FILES,
});

export const addFiles: ActionCreator<IAddFilesAction> = (files: Array<UploadFile>) => ({
  type: FilesActionTypes.ADD_FILES,
  payload: files,
});

export const getFile: ActionCreator<IGetFileAction> = (uid: string) => ({
  type: FilesActionTypes.GET_FILE,
  payload: uid,
});

export const setFiles: ActionCreator<ISetFilesAction> = (files: Array<UploadFile>) => ({
  type: FilesActionTypes.SET_FILES,
  payload: files,
});

export const selectFile: ActionCreator<ISelectFileAction> = (uid: string) => ({
  type: FilesActionTypes.SELECT_FILE,
  payload: uid,
});
