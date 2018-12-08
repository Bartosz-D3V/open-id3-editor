import ReactDOM from 'react-dom';
import React from 'react';
import { ImageFile } from 'react-dropzone';
import { mount } from 'enzyme';
import { FileList } from '@components/FileList/FileList';

describe('FileList component', () => {
  const div: HTMLElement = document.createElement('div');
  const mockFile1: ImageFile = new File([], 'Mock_track_1.mp3', { type: 'image/pdf' });
  const mockFile2: ImageFile = new File([], 'Mock_track_2.mp3', { type: 'image/pdf' });
  const mockFileList: Array<ImageFile> = [mockFile1, mockFile2];

  it('should render', () => {
    ReactDOM.render(<FileList files={mockFileList} />, div);
    ReactDOM.unmountComponentAtNode(div);

    expect(div.getElementsByTagName('FileList')).toBeTruthy();
  });

  it('should render elements with file names', () => {
    const wrapper = mount(<FileList files={mockFileList} />);

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
