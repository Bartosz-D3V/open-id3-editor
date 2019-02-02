import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { AutoComplete, Form, Input, InputNumber } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import ID3V11 from '@api/id3v1/domain/id3V1-1';
import Genre from '@api/id3/domain/genre';
import { TagFormV22 } from './TagFormV2-2';

const TextArea = Input.TextArea;

describe('TagFormV2-2 component', () => {
  const mockUploadFile: UploadFile = {
    uid: 'QW1',
    size: 100,
    name: 'Mock_Track_1',
    type: 'blob/mp3',
  };
  let wrapper: ReactWrapper;

  beforeAll(() => {
    const id3: ID3V11 = new ID3V11(
      'title',
      'artist',
      'album',
      2000,
      'comment',
      true,
      8,
      new Genre(0, 'Blues')
    );
    spyOn(TagFormV22.prototype, 'constructID3').and.returnValue(Promise.resolve(id3));
    wrapper = mount(<TagFormV22 selectedFile={mockUploadFile} />);
    wrapper.setState({ id3 });
    wrapper.update();
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    expect(wrapper.find(TagFormV22)).toBeTruthy();
  });
});
