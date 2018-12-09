import React from 'react';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import { FileElement } from '@components/FileElement/FileElement';

describe('FileElement component', () => {
  const mockFileName = 'My_track.mp3';
  let wrapper: ReactWrapper | ShallowWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    wrapper = mount(<FileElement fileName={mockFileName} />);

    expect(wrapper.find('FileElement')).toBeTruthy();
  });

  it('should render file name', () => {
    wrapper = shallow(<FileElement fileName={mockFileName} />);

    expect(wrapper.text()).toEqual(mockFileName);
  });
});
