import ReactDOM from 'react-dom';
import React from 'react';
import { shallow } from 'enzyme';
import { FileElement } from '@components/FileElement/FileElement';

describe('FileElement component', () => {
  const mockFileName = 'My_track.mp3';
  const div: HTMLElement = document.createElement('div');

  it('should render', () => {
    ReactDOM.render(<FileElement fileName={mockFileName} />, div);
    ReactDOM.unmountComponentAtNode(div);

    expect(div.getElementsByTagName('FileElement')).toBeTruthy();
  });

  it('should render file name', () => {
    const wrapper = shallow(<FileElement fileName={mockFileName} />);

    expect(wrapper.text()).toEqual(mockFileName);
  });
});
