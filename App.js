import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from './src/config/store';
import Routes from './src/config/routes';
import Toast from 'react-native-toast-message';
import './i18n';
import SplashScreen from 'react-native-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
import ThemeProviderWrapper from './src/components/ThemeProviderWrapper';
import {LogBox} from 'react-native';

const App = () => {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
    TrackPlayer.setupPlayer();
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications
  }, []);

  return (
    <Provider store={store}>
      <ThemeProviderWrapper>
        <GestureHandlerRootView style={{flex: 1}}>
          <Routes />
          <Toast />
        </GestureHandlerRootView>
      </ThemeProviderWrapper>
    </Provider>
  );
};

export default App;
