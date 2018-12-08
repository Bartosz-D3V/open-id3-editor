import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { App } from '@components/App';

const appElement: HTMLElement = document.getElementById('app');

if (appElement) {
  ReactDOM.render(
    <HashRouter>
      <App />
    </HashRouter>,
    appElement
  );
} else {
  throw new ReferenceError('Expected element does not exist');
}
