import React from 'react';
import { HashRouter } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import { Menu } from 'antd';
import { TagMenu } from '@components/TagMenu/TagMenu';

describe('TagMenu component', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <HashRouter>
        <TagMenu />
      </HashRouter>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    expect(wrapper.find(TagMenu)).toBeTruthy();
  });

  it('should render menu elements with tag version', () => {
    expect(
      wrapper
        .find(Menu.Item)
        .at(0)
        .text()
    ).toEqual('ID3v1.0');
    expect(
      wrapper
        .find(Menu.Item)
        .at(1)
        .text()
    ).toEqual('ID3v1.1');
    expect(
      wrapper
        .find(Menu.Item)
        .at(2)
        .text()
    ).toEqual('ID3v2.3');
  });

  it('should have home button', () => {
    expect(
      wrapper
        .find(Menu.Item)
        .at(3)
        .text()
    ).toEqual('Home');
  });
});
