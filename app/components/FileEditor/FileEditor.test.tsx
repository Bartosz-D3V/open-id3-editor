import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UploadFile } from 'antd/lib/upload/interface';
import { FileEditor } from '@components/FileEditor/FileEditor';

describe('FileEditor component', () => {
  let wrapper: ShallowWrapper;
  const mockUploadFile: UploadFile = {
    uid: '',
    size: 2000,
    name: 'mock.mp3',
    type: 'audio/mp3',
  };

  beforeEach(() => {
    wrapper = shallow(
      <FileEditor files={[mockUploadFile]} selectedFile={mockUploadFile} selectFile={jest.fn()} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    expect(wrapper.find(FileEditor)).toBeTruthy();
  });
});
