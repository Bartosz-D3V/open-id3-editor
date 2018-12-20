import React from 'react';
import { ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import { FileElement } from '@components/FileElement/FileElement';

describe('FileElement component', () => {
  const mockFileName = 'My_track.mp3';
  let wrapper: ReactWrapper | ShallowWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    wrapper = shallow(<FileElement filename={mockFileName} />);

    expect(wrapper.find(FileElement)).toBeTruthy();
  });

  it('should render file name', () => {
    wrapper = shallow(<FileElement filename={mockFileName} />);

    expect(wrapper.childAt(0).text()).toEqual(mockFileName);
  });
});
