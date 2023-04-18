import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/config/store';
import Routes from './src/config/routes';
import Toast from 'react-native-toast-message';
import './i18n';
import SplashScreen from 'react-native-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Routes />
        <Toast />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
