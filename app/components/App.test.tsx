import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

describe('App component', () => {
  it('should render', () => {
    const div: HTMLElement = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);

    expect(div.getElementsByTagName('App')).toBeTruthy();
  });
});
