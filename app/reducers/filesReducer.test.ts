import { ImageFile } from 'react-dropzone';
import { FilesActionTypes } from '@actions/filesActionTypes';
import { FilesAction } from '@actions/iFilesAction';
import { IFilesState } from '@states/iFilesState';
import filesReducer from './filesReducer';

describe('FilesReducer', () => {
  const mockFile: ImageFile = new File([], 'mockFileName', { type: 'image/pdf' });
  const mockState: IFilesState = {
    files: [mockFile],
  };

  it('should return passed state for GET_FILES action', () => {
    const action: FilesAction = {
      type: FilesActionTypes.GET_FILES,
    };
    const newState: IFilesState = filesReducer(mockState, action);

    expect(newState.files).toEqual(mockState.files);
  });

  it('should return new state with files for ADD_FILES action', () => {
    const action: FilesAction = {
      type: FilesActionTypes.ADD_FILES,
      payload: [mockFile],
    };
    const newState: IFilesState = filesReducer(mockState, action);

    expect(newState.files).toEqual(mockState.files);
  });
});
