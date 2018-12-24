import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { standardContainer } from '@hoc/StandardContainer/StandardContainer';

const MockComponent = () => {
  return <div style={{ backgroundColor: 'red' }} aria-busy={true} />;
};

describe('StandardContainer HOC', () => {
  let wrapper: ReactWrapper;
  const ActualHOCContainer = standardContainer(MockComponent);

  beforeEach(() => {
    wrapper = mount(<ActualHOCContainer />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should copy passed props', () => {
    expect(wrapper.find('div').props()).toHaveProperty('style.backgroundColor', 'red');
    expect(wrapper.find('div').props()).toHaveProperty('aria-busy', true);
  });

  it("should wrap component with CSS styles for application's container", () => {
    expect(
      wrapper
        .find('div')
        .parent()
        .props()
    ).toHaveProperty('style.width', '100%');
    expect(
      wrapper
        .find('div')
        .parent()
        .props()
    ).toHaveProperty('style.backgroundColor', 'white');
  });
});
