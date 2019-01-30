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

  describe('form', () => {
    it('should have Title input with read ID3 property', () => {
      expect(wrapper.find(Form.Item).get(2)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(2).props).toHaveProperty('label', 'Title');
      expect(wrapper.find(Input).get(0).props).toHaveProperty('value', 'title');
      expect(wrapper.find(Input).get(0).props).toHaveProperty('maxLength', 30);
    });

    it('should have Artist input with read ID3 property', () => {
      expect(wrapper.find(Form.Item).get(3)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(3).props).toHaveProperty('label', 'Artist');
      expect(wrapper.find(Input).get(1).props).toHaveProperty('value', 'artist');
      expect(wrapper.find(Input).get(1).props).toHaveProperty('maxLength', 30);
    });

    it('should have Album input with read ID3 property', () => {
      expect(wrapper.find(Form.Item).get(4)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(4).props).toHaveProperty('label', 'Album');
      expect(wrapper.find(Input).get(2).props).toHaveProperty('value', 'album');
      expect(wrapper.find(Input).get(2).props).toHaveProperty('maxLength', 28);
    });

    it('should have Year input with read ID3 property', () => {
      expect(wrapper.find(Form.Item).get(5)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(5).props).toHaveProperty('label', 'Year');
      expect(wrapper.find(InputNumber).get(0).props).toHaveProperty('value', 2000);
      expect(wrapper.find(InputNumber).get(0).props).toHaveProperty('min', 0);
      expect(wrapper.find(InputNumber).get(0).props).toHaveProperty('precision', 0);
      expect(wrapper.find(InputNumber).get(0).props).toHaveProperty('maxLength', 4);
    });

    it('should have Track Number input with read ID3 property', () => {
      expect(wrapper.find(Form.Item).get(6)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(6).props).toHaveProperty('label', 'Track number');
      expect(wrapper.find(InputNumber).get(1).props).toHaveProperty('value', 8);
      expect(wrapper.find(InputNumber).get(1).props).toHaveProperty('min', 1);
      expect(wrapper.find(InputNumber).get(1).props).toHaveProperty('precision', 0);
      expect(wrapper.find(InputNumber).get(1).props).toHaveProperty('maxLength', 2);
    });

    it('should have Comment input with read ID3 property', () => {
      expect(wrapper.find(Form.Item).get(7)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(7).props).toHaveProperty('label', 'Comment');
      expect(wrapper.find(TextArea).get(0).props).toHaveProperty('value', 'comment');
      expect(wrapper.find(TextArea).get(0).props).toHaveProperty('maxLength', 30);
    });

    it('should have Genre input with read ID3 property', () => {
      expect(wrapper.find(Form.Item).get(8)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(8).props).toHaveProperty('label', 'Genre');
      expect(wrapper.find(Input).get(3).props).toHaveProperty('value', 'Blues');
      expect(wrapper.find(AutoComplete).get(0).props).toHaveProperty('placeholder', 'Genre');
    });

    it('should update the state when changing values', () => {
      wrapper
        .find(Input)
        .at(0)
        .simulate('change', { target: { name: 'title', value: 'New title' } });
      wrapper
        .find(Input)
        .at(1)
        .simulate('change', { target: { name: 'artist', value: 'New artist' } });
      wrapper
        .find(Input)
        .at(2)
        .simulate('change', { target: { name: 'album', value: 'New album' } });
      wrapper
        .find(InputNumber)
        .at(0)
        .prop('onChange')(2002);
      wrapper
        .find(InputNumber)
        .at(1)
        .prop('onChange')(undefined);
      wrapper
        .find(Input)
        .at(2)
        .simulate('change', { target: { name: 'comment', value: 'New comment' } });
      wrapper
        .find(AutoComplete)
        .at(0)
        .prop('onChange')('1');

      expect(wrapper.state('id3')).toHaveProperty('title', 'New title');
      expect(wrapper.state('id3')).toHaveProperty('artist', 'New artist');
      expect(wrapper.state('id3')).toHaveProperty('album', 'New album');
      expect(wrapper.state('id3')).toHaveProperty('year', 2002);
      expect(wrapper.state('id3')).toHaveProperty('track', null);
      expect(wrapper.state('id3')).toHaveProperty('zeroByte', false);
      expect(wrapper.state('id3')).toHaveProperty('comment', 'New comment');
      expect(wrapper.state('id3')).toHaveProperty('genre', {
        index: 1,
        description: 'Classic Rock',
      });
    });
  });
});
