/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import {name as appName} from './app.json';


const ReduxApp = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );

AppRegistry.registerComponent(appName, () => ReduxApp);
