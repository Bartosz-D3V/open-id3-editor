import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { UploadFile } from 'antd/lib/upload/interface';
import { FileList } from '@components/FileList/FileList';

describe('FileList component', () => {
  const mockFile1: UploadFile = { uid: 'QW1', size: 100, name: 'Mock_Track_1', type: 'blob/mp3' };
  const mockFile2: UploadFile = { uid: 'QW2', size: 100, name: 'Mock_Track_2', type: 'blob/mp3' };
  const mockFileList: Array<UploadFile> = [mockFile1, mockFile2];
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    wrapper = mount(<FileList files={mockFileList} />);

    expect(wrapper.find('FileList')).toBeTruthy();
  });

  it('should render elements with file names', () => {
    wrapper = mount(<FileList files={mockFileList} />);

    expect(
      wrapper
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual(mockFile1.name);
    expect(
      wrapper
        .childAt(0)
        .childAt(1)
        .text()
    ).toEqual(mockFile2.name);
  });
});
