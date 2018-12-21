import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Persistor } from 'redux-persist/es/types';
import DragAndDrop from '@containers/DragAndDrop';
import FileEditor from '@containers/FileEditor';
import configureStore from '@store/configureStore';

const { store, persistor }: { store: Store; persistor: Persistor } = configureStore();

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <HashRouter>
            <main>
              <Route exact={true} path="/" component={DragAndDrop} />
              <Route path="/file-list" component={FileEditor} />
            </main>
          </HashRouter>
        </PersistGate>
      </Provider>
    );
  }
}
