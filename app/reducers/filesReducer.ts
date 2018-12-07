import { FilesActionTypes } from '../actions/filesActionTypes';
import { IFilesState } from '../states/iFilesState';
import { FilesAction } from '../actions/iFilesAction';

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
  }
};
