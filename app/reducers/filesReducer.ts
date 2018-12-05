import { FilesActionTypes } from '../actions/filesActionTypes';
import { FilesState } from '../states/filesState';

const initialState: FilesState = {
  files: [],
};

export default (state = initialState, action): FilesState => {
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
