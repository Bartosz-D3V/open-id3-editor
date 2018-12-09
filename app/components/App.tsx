import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import FilesReducer from '@reducers/filesReducer';
import DragAndDrop from '@containers/DragAndDrop';
import FileList from '@containers/FileList';

const store = createStore(FilesReducer);

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <HashRouter>
          <main>
            <Route exact={true} path="/" component={DragAndDrop} />
            <Route path="/file-list" component={FileList} />
          </main>
        </HashRouter>
      </Provider>
    );
  }
}
