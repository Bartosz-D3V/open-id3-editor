import filesReducer from './filesReducer';
import { FilesState } from '../states/filesState';
import { FilesActionTypes } from '../actions/filesActionTypes';

describe('FilesReducer', () => {
  const mockState = [{}];

  it('should return passed state by default', () => {
    const newState: FilesState = filesReducer(mockState, null);

    expect(newState).toEqual(mockState);
  });

  it('should return passed state for GET_FILES action', () => {
    const newState: FilesState = filesReducer(mockState, FilesActionTypes.GET_FILES);

    expect(newState).toEqual(mockState);
  });

  it('should return new state with files for ADD_FILES action', () => {
    const action = {
      type: FilesActionTypes.ADD_FILES,
      files: [{ file: 'mockFile' }],
    };
    const newState: FilesState = filesReducer(mockState, action);

    expect(newState).toEqual(mockState);
  });
});
