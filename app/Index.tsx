import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Hello } from './components/Hello';

const appElement: HTMLElement = document.getElementById('app');

if (appElement) {
  ReactDom.render(<Hello compiler="TypeScript" framework="React" />, appElement);
}
