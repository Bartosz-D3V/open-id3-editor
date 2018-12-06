import React from 'react';
import ReactDOM from 'react-dom';
import { DragAndDrop } from './DragAndDrop';

describe('DragAndDrop component', () => {
  it('should render', () => {
    const div: HTMLElement = document.createElement('div');
    ReactDOM.render(<DragAndDrop addFiles={jest.fn()} />, div);
    ReactDOM.unmountComponentAtNode(div);

    expect(div.getElementsByTagName('DragAndDrop')).toBeTruthy();
  });
});
