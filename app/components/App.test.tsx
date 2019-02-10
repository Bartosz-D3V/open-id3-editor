import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { App } from './App';

describe('App component', () => {
  let wrapper: ShallowWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    wrapper = shallow(<App />);

    expect(wrapper.find('App')).toBeTruthy();
  });
});
