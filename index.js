/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import  { store, persistor } from './redux-persist/store';
import App from './App';
import { name as appName } from './app.json';
import { PersistGate } from 'redux-persist/integration/react';


const ReduxApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
