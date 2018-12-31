import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { FileElement } from '@components/FileElement/FileElement';

describe('FileElement component', () => {
  const mockFileName = 'My_track.mp3';
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<FileElement filename={mockFileName} uid="1" />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    expect(wrapper.find(FileElement)).toBeTruthy();
  });

  it('should render file name', () => {
    expect(wrapper.childAt(0).text()).toEqual(mockFileName);
  });
});
