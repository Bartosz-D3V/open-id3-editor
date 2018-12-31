import { FilesActionTypes } from '@actions/filesActionTypes';
import { IFilesState } from '@states/iFilesState';
import { FilesAction } from '@actions/iFilesAction';

const initialState: IFilesState = {
  files: [],
  selectedFile: null,
};

export default (state = initialState, action: FilesAction): IFilesState => {
  switch (action.type) {
    case FilesActionTypes.GET_FILES:
    default:
      return state;
    case FilesActionTypes.ADD_FILES:
      return {
        ...state,
        files: state.files.concat(action.payload),
      };
    case FilesActionTypes.GET_FILE:
      return {
        ...state,
        files: state.files.filter(uploadFile => uploadFile.uid === action.payload),
      };
    case FilesActionTypes.SET_FILES:
      return {
        ...state,
        files: action.payload,
      };
    case FilesActionTypes.SELECT_FILE:
      return {
        ...state,
        selectedFile: state.files.find(uploadFile => uploadFile.uid === action.payload),
      };
  }
};
