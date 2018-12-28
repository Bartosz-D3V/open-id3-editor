import { createStore, Store } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistConfig, Persistor } from 'redux-persist/es/types';
import rootReducer from '@reducers/filesReducer';

const persistConfig: PersistConfig = {
  storage,
  key: 'root',
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store: Store = createStore(persistedReducer);
  const persistor: Persistor = persistStore(store);
  return { store, persistor };
};
