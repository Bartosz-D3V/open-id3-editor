import { FilesActionTypes } from '../actions/filesActionTypes';
import { FilesState } from '../states/filesState';
import { FilesAction } from '../actions/filesAction';

const initialState: FilesState = {
  files: [],
};

export default (state = initialState, action: FilesAction): FilesState => {
  switch (action.type) {
    case FilesActionTypes.GET_FILES:
    default:
      return state;
    case FilesActionTypes.ADD_FILES:
      return {
        ...state,
        files: action.files,
      };
  }
};
