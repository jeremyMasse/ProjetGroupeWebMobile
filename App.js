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

const App = () => {
  // const theme = useSelector(state => state.theme.theme);

  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
    TrackPlayer.setupPlayer();
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
