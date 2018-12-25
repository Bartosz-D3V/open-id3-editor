import { FilesActionTypes } from '@actions/filesActionTypes';
import { IFilesState } from '@states/iFilesState';
import { FilesAction } from '@actions/iFilesAction';
import { UploadFile } from 'antd/lib/upload/interface';

const initialState: IFilesState = {
  files: [],
};

export default (state = initialState, action: FilesAction): IFilesState => {
  switch (action.type) {
    case FilesActionTypes.GET_FILES:
    default:
      return state;
    case FilesActionTypes.ADD_FILES:
      return {
        ...state,
        files: action.payload,
      };
    case FilesActionTypes.GET_FILE:
      return {
        ...state,
        files: state.files.filter((uploadFile: UploadFile) => uploadFile.uid === action.payload),
      };
  }
};
