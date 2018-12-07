import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import DragAndDrop from '../containers/DragAndDrop';
import FilesReducer from '../reducers/filesReducer';

const store = createStore(FilesReducer);

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <DragAndDrop />
      </Provider>
    );
  }
}
