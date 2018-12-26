import IAddFilesAction from './iAddFilesAction';
import IGetFilesAction from './iGetFilesAction';
import IGetFileAction from './iGetFileAction';
import ISelectFileAction from './iSelectFileAction';

export type FilesAction = IAddFilesAction | IGetFilesAction | IGetFileAction | ISelectFileAction;
