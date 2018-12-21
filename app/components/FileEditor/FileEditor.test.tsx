import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { FileEditor } from '@components/FileEditor/FileEditor';

describe('FileEditor component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<FileEditor files={[]} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    expect(wrapper.find(FileEditor)).toBeTruthy();
  });
});
