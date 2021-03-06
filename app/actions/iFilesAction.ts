import IAddFilesAction from './iAddFilesAction';
import IGetFilesAction from './iGetFilesAction';
import IGetFileAction from './iGetFileAction';
import ISelectFileAction from './iSelectFileAction';
import ISetFilesAction from '@actions/iSetFilesAction';

export type FilesAction =
  | IAddFilesAction
  | IGetFilesAction
  | IGetFileAction
  | ISelectFileAction
  | ISetFilesAction;
