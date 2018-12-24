import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { AutoComplete, Form, Input, InputNumber } from 'antd';
import { TagFormV11 } from '@components/TagForm/TagFormV1-1';

const TextArea = Input.TextArea;

describe('TagFormV1-1 component', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<TagFormV11 />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    expect(wrapper.find(TagFormV11)).toBeTruthy();
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
      expect(wrapper.find(TextArea).get(0).props).toHaveProperty('maxLength', 28);
    });

    it('should have Track input', () => {
      expect(wrapper.find(Form.Item).get(5)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(5).props).toHaveProperty('label', 'Track');
      expect(wrapper.find(InputNumber).get(1).props).toHaveProperty('min', 0);
      expect(wrapper.find(InputNumber).get(1).props).toHaveProperty('max', 255);
    });

    it('should have Genre input', () => {
      expect(wrapper.find(Form.Item).get(6)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(6).props).toHaveProperty('label', 'Genre');
      expect(wrapper.find(AutoComplete).get(0).props).toHaveProperty('placeholder', 'Genre');
    });
  });
});
