import React from 'react';
import { AutoComplete, Form, Input } from 'antd';
import { mount, ReactWrapper } from 'enzyme';
import { UploadFile } from 'antd/lib/upload/interface';
import ID3V23 from '@api/id3v2/domain/2.3/id3v2';
import ID3V2Header from '@api/id3v2/domain/2.3/id3v2Header';
import ID3V2HeaderFlags from '@api/id3v2/domain/2.3/id3v2HeaderFlags';
import ID3V2Frame from '@api/id3v2/domain/2.3/id3v2Frame';
import ID3V2FrameFlags from '@api/id3v2/domain/2.3/id3v2FrameFlags';
import { FrameID } from '@api/id3v2/domain/2.3/frameID';
import { TagFormV23 } from './TagFormV2-3';

const TextArea = Input.TextArea;

describe('TagFormV2-3 component', () => {
  const mockUploadFile: UploadFile = {
    uid: 'QW1',
    size: 100,
    name: 'Mock_Track_1',
    type: 'blob/mp3',
  };
  const id3Header: ID3V2Header = new ID3V2Header(3, new ID3V2HeaderFlags(), 100);
  const talb: ID3V2Frame = new ID3V2Frame('TALB', new ID3V2FrameFlags(), 'Some title', 10);
  const tpe1: ID3V2Frame = new ID3V2Frame('TPE1', new ID3V2FrameFlags(), 'Soloist', 7);
  const tpe2: ID3V2Frame = new ID3V2Frame('TPE2', new ID3V2FrameFlags(), 'Band', 4);
  const tcom: ID3V2Frame = new ID3V2Frame('TCOM', new ID3V2FrameFlags(), 'Composer', 8);
  const tcon: ID3V2Frame = new ID3V2Frame('TCON', new ID3V2FrameFlags(), 'Classic Rock', 15);
  const tpos: ID3V2Frame = new ID3V2Frame('TPOS', new ID3V2FrameFlags(), '5', 1);
  const comm: ID3V2Frame = new ID3V2Frame('COMM', new ID3V2FrameFlags(), 'Some comment', 12);
  const tyer: ID3V2Frame = new ID3V2Frame('TYER', new ID3V2FrameFlags(), '2000', 4);
  const trck: ID3V2Frame = new ID3V2Frame('TRCK', new ID3V2FrameFlags(), '2', 1);
  const body: Array<ID3V2Frame> = [talb, tpe1, tpe2, tcom, tcon, tpos, comm, tyer, trck];
  const id3: ID3V23 = new ID3V23(id3Header, body);
  let wrapper: ReactWrapper;

  beforeAll(() => {
    spyOn(TagFormV23.prototype, 'constructID3').and.returnValue(Promise.resolve(id3));
    wrapper = mount(<TagFormV23 selectedFile={mockUploadFile} />);
    wrapper.setState({ id3 });
    wrapper.update();
  });

  afterAll(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    expect(wrapper.find(TagFormV23)).toBeTruthy();
  });

  describe('form', () => {
    it('should have TALB input with read ID3 property', () => {
      expect(wrapper.find(Form.Item).get(2)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(2).props).toHaveProperty('label', FrameID.TALB);
      expect(wrapper.find(Input).get(0).props).toHaveProperty('value', 'Some title');
    });

    it('should have TPE1 input with read ID3 property', () => {
      expect(wrapper.find(Form.Item).get(3)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(3).props).toHaveProperty('label', FrameID.TPE1);
      expect(wrapper.find(Input).get(1).props).toHaveProperty('value', 'Soloist');
    });

    it('should have TPE2 input with read ID3 property', () => {
      expect(wrapper.find(Form.Item).get(4)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(4).props).toHaveProperty('label', FrameID.TPE2);
      expect(wrapper.find(Input).get(2).props).toHaveProperty('value', 'Band');
    });

    it('should have TCOM input with read ID3 property', () => {
      expect(wrapper.find(Form.Item).get(5)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(5).props).toHaveProperty('label', FrameID.TCOM);
      expect(wrapper.find(Input).get(3).props).toHaveProperty('value', 'Composer');
    });

    it('should have TCON input with read ID3 property', () => {
      expect(wrapper.find(Form.Item).get(6)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(6).props).toHaveProperty('label', FrameID.TCON);
      expect(wrapper.find(Input).get(4).props).toHaveProperty('value', 'Classic Rock');
      expect(wrapper.find(AutoComplete).get(0).props).toHaveProperty('placeholder', 'Genre');
    });

    it('should have TPOS input with read ID3 property', () => {
      expect(wrapper.find(Form.Item).get(7)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(7).props).toHaveProperty('label', FrameID.TPOS);
      expect(wrapper.find(Input).get(5).props).toHaveProperty('value', '5');
    });

    it('should have COMM input with read ID3 property', () => {
      expect(wrapper.find(Form.Item).get(8)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(8).props).toHaveProperty('label', FrameID.COMM);
      expect(wrapper.find(TextArea).props()).toHaveProperty('value', 'Some comment');
    });

    it('should have TYER input with read ID3 property', () => {
      expect(wrapper.find(Form.Item).get(9)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(9).props).toHaveProperty('label', FrameID.TYER);
      expect(wrapper.find(Input).get(6).props).toHaveProperty('value', '2000');
    });

    it('should have TRCK input with read ID3 property', () => {
      expect(wrapper.find(Form.Item).get(10)).toBeTruthy();
      expect(wrapper.find(Form.Item).get(10).props).toHaveProperty('label', FrameID.TRCK);
      expect(wrapper.find(Input).get(7).props).toHaveProperty('value', '2');
    });
  });
});
