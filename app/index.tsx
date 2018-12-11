import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from '@components/App';
import 'antd/dist/antd.css';

const appElement: HTMLElement = document.getElementById('app');

if (appElement) {
  ReactDOM.render(<App />, appElement);
} else {
  throw new ReferenceError('Expected element does not exist');
}
