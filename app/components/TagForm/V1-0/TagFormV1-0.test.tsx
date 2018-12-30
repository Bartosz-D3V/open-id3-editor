import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { AutoComplete, Form, Input, InputNumber } from 'antd';
import ID3V10 from '@api/id3v1/domain/id3V1-0';
import { TagFormV10 } from './TagFormV1-0';

const TextArea = Input.TextArea;

describe('TagFormV1-0 component', () => {
  const mockUploadFile = { uid: 'QW1', size: 100, name: 'Mock_Track_1', type: 'blob/mp3' };
  let wrapper: ReactWrapper;

  beforeAll(() => {
    const id3: ID3V10 = new ID3V10();
    spyOn(TagFormV10.prototype, 'constructID3').and.returnValue(Promise.resolve(id3));
    wrapper = mount(<TagFormV10 selectedFile={mockUploadFile} />);
    wrapper.setState({ id3 });
    wrapper.update();
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    expect(wrapper.find(TagFormV10)).toBeTruthy();
  });

  describe('form', () => {
    it('should have Title input', () => {
      expect(wrapper.find(Form.Item).get(0)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(0).props).toHaveProperty('label', 'Title');
      expect(wrapper.find(Input).get(0).props).toHaveProperty('maxLength', 30);
    });

    it('should have Artist input', () => {
      expect(wrapper.find(Form.Item).get(1)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(1).props).toHaveProperty('label', 'Artist');
      expect(wrapper.find(Input).get(1).props).toHaveProperty('maxLength', 30);
    });

    it('should have Album input', () => {
      expect(wrapper.find(Form.Item).get(2)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(2).props).toHaveProperty('label', 'Album');
      expect(wrapper.find(Input).get(2).props).toHaveProperty('maxLength', 30);
    });

    it('should have Year input', () => {
      expect(wrapper.find(Form.Item).get(3)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(3).props).toHaveProperty('label', 'Year');
      expect(wrapper.find(InputNumber).get(0).props).toHaveProperty('min', 0);
      expect(wrapper.find(InputNumber).get(0).props).toHaveProperty('precision', 0);
      expect(wrapper.find(InputNumber).get(0).props).toHaveProperty('maxLength', 4);
    });

    it('should have Comment input', () => {
      expect(wrapper.find(Form.Item).get(4)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(4).props).toHaveProperty('label', 'Comment');
      expect(wrapper.find(TextArea).get(0).props).toHaveProperty('maxLength', 30);
    });

    it('should have Genre input', () => {
      expect(wrapper.find(Form.Item).get(5)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(5).props).toHaveProperty('label', 'Genre');
      expect(wrapper.find(AutoComplete).get(0).props).toHaveProperty('placeholder', 'Genre');
    });
  });
});
