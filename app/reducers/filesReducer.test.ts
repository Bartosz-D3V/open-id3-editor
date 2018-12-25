import { UploadFile } from 'antd/lib/upload/interface';
import { FilesActionTypes } from '@actions/filesActionTypes';
import { FilesAction } from '@actions/iFilesAction';
import { IFilesState } from '@states/iFilesState';
import filesReducer from './filesReducer';

describe('FilesReducer', () => {
  const mockFile1: UploadFile = { uid: 'QW1', size: 100, name: 'Test 1', type: 'image/pdf' };
  const mockFile2: UploadFile = { uid: 'QW2', size: 200, name: 'Test 2', type: 'image/pdf' };
  const mockState: IFilesState = {
    files: [mockFile1, mockFile2],
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
      payload: [mockFile1],
    };
    const newState: IFilesState = filesReducer(mockState, action);

    expect(newState.files).toEqual(mockState.files);
  });

  it('should return new state with selected file for GET_FILE action', () => {
    const action: FilesAction = {
      type: FilesActionTypes.GET_FILE,
      payload: 'QW2',
    };
    const newState: IFilesState = filesReducer(mockState, action);

    expect(newState.files).toEqual([mockFile2]);
  });
});
