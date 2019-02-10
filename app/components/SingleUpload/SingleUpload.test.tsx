import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import APICFrame from '@api/id3v2/domain/2.3/apicFrame';
import { UploadFile } from 'antd/es/upload/interface';
import { FrameID } from '@api/id3v2/domain/2.3/frameID';
import SingleUpload from './SingleUpload';

describe('SingleUpload component', () => {
  let wrapper: ReactWrapper;
  const mockFrame: APICFrame = new APICFrame(0, 'image/jpeg', 3, null, 'BINARY_DATA');

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    wrapper = mount(<SingleUpload apicFrame={mockFrame} />);

    expect(wrapper.find('SingleUpload')).toBeTruthy();
  });

  it('should create UploadState and save to state after receiving props', () => {
    wrapper = mount(<SingleUpload apicFrame={mockFrame} />);
    wrapper.setProps({ apicFrame: mockFrame });
    const fileList: Array<UploadFile> = wrapper.state('fileList');

    expect(fileList[0].uid).toEqual('SINGLE_IMG');
    expect(fileList[0].status).toEqual('done');
    expect(fileList[0].size).toEqual(10);
    expect(fileList[0].type).toEqual('BINARY_DATA');
    expect(fileList[0].url).toEqual('data:image/jpeg;base64,QklOQVJZX0RBVEE=');
  });

  it('should render Upload tile with image', () => {
    wrapper = mount(<SingleUpload apicFrame={mockFrame} />);
    wrapper.setProps({ apicFrame: mockFrame });

    expect(wrapper.find('img')).toBeTruthy();
    expect(wrapper.find('img').props()).toHaveProperty(
      'src',
      'data:image/jpeg;base64,QklOQVJZX0RBVEE='
    );
  });

  it('should render modal once click on expand button', () => {
    wrapper = mount(<SingleUpload apicFrame={mockFrame} />);
    wrapper.setState({ previewVisible: true });
    wrapper.setProps({ apicFrame: mockFrame });

    expect(
      wrapper
        .find('img')
        .at(1)
        .props()
    ).toHaveProperty('alt', FrameID.APIC);
  });

  it('should render Upload button if fileList is empty', () => {
    wrapper = mount(<SingleUpload apicFrame={null} />);

    expect(wrapper.find('UploadButton')).toBeTruthy();
  });
});
