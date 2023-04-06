import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/config/store';
import Routes from './src/config/routes';
import Toast from 'react-native-toast-message';
import Player from './src/components/Player';
import './i18n';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
      <Player />
      <Toast />
    </Provider>
  );
};

export default App;
