import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { FileList } from '@components/FileList/FileList';

describe('FileList component', () => {
  const mockFile1: File = new File([], 'Mock_track_1.mp3', { type: 'image/pdf' });
  const mockFile2: File = new File([], 'Mock_track_2.mp3', { type: 'image/pdf' });
  const mockFileList: Array<File> = [mockFile1, mockFile2];
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
