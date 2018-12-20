import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { UploadFile } from 'antd/lib/upload/interface';
import { FileList } from '@components/FileList/FileList';
import { FileElement } from '@components/FileElement/FileElement';

describe('FileList component', () => {
  const mockFile1: UploadFile = { uid: 'QW1', size: 100, name: 'Mock_Track_1', type: 'blob/mp3' };
  const mockFile2: UploadFile = { uid: 'QW2', size: 100, name: 'Mock_Track_2', type: 'blob/mp3' };
  const mockFileList: Array<UploadFile> = [mockFile1, mockFile2];
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<FileList files={mockFileList} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    expect(wrapper.find('FileList')).toBeTruthy();
  });

  it('should render elements with file names', () => {
    expect(
      wrapper
        .find(FileElement)
        .at(0)
        .text()
    ).toEqual(mockFile1.name);
    expect(
      wrapper
        .find(FileElement)
        .at(1)
        .text()
    ).toEqual(mockFile2.name);
  });
});
