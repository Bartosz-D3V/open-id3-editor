import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Hello } from './components/Hello';

const appElement: HTMLElement = document.getElementById('app');

if (appElement) {
  ReactDOM.render(<Hello compiler="TypeScript" framework="React" />, appElement);
} else {
  throw new ReferenceError('Expected element does not exist');
}
