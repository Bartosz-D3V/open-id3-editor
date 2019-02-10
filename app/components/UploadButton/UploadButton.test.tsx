import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import UploadButton from './UploadButton';

describe('UploadButton component', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    wrapper = mount(<UploadButton />);

    expect(wrapper).toBeTruthy();
  });

  it('should display "Upload" text', () => {
    wrapper = mount(<UploadButton />);

    expect(wrapper.text()).toEqual('Upload');
  });
});
