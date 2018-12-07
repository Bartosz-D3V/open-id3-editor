import * as React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import FilesReducer from '@reducers/filesReducer';
import DragAndDrop from '@containers/DragAndDrop';

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
