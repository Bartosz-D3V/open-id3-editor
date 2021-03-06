import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { App } from '@components/App';

const appElement: HTMLElement = document.getElementById('app');

if (appElement) {
  ReactDOM.render(<App />, appElement);
} else {
  throw new ReferenceError('Expected element does not exist');
}
