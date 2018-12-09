import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { MemoryRouter } from 'react-router';
import DragAndDrop from './DragAndDrop';

describe('DragAndDrop component', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <DragAndDrop addFiles={jest.fn()} />
      </MemoryRouter>
    );

    expect(wrapper.find(DragAndDrop)).toBeTruthy();
  });
});
