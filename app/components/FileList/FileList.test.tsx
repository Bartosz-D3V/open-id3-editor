import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UploadFile } from 'antd/lib/upload/interface';
import { FileList } from '@components/FileList/FileList';
import FileElement from '@containers/FileElement';

describe('FileList component', () => {
  const mockFile1: UploadFile = { uid: 'QW1', size: 100, name: 'Mock_Track_1', type: 'blob/mp3' };
  const mockFile2: UploadFile = { uid: 'QW2', size: 100, name: 'Mock_Track_2', type: 'blob/mp3' };
  const mockFileList: Array<UploadFile> = [mockFile1, mockFile2];
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<FileList files={mockFileList} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    expect(wrapper.find(FileList)).toBeTruthy();
  });

  it('should render elements with file names', () => {
    expect(
      wrapper
        .find(FileElement)
        .at(0)
        .props().filename
    ).toEqual(mockFile1.name);
    expect(
      wrapper
        .find(FileElement)
        .at(1)
        .props().filename
    ).toEqual(mockFile2.name);
  });
});
