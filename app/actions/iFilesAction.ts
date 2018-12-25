import IAddFilesAction from './iAddFilesAction';
import IGetFilesAction from './iGetFilesAction';
import IGetFileAction from './iGetFileAction';

export type FilesAction = IAddFilesAction | IGetFilesAction | IGetFileAction;
