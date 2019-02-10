import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import UploadButton from './UploadButton';

describe('UploadButton component', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<UploadButton />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should display "Upload" text', () => {
    expect(wrapper.text()).toEqual('Upload');
  });
});
