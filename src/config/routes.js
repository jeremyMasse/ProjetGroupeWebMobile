import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Home from '../screens/home';
import SpotifyLogin from '../screens/spotifyLogin';
import GeneratePlaylist from '../screens/generatePlaylist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('accessToken')
      .then(token => {
        setIsLoggedIn(!!token);
      })
      .catch(err => {
        // console.log('🚀 ~ file: routes.js:6 ~ Routes ~ err', err);
      });
  }, []);

  return (
    <GlobalSafeArea>
      <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="SpotifyLogin" component={SpotifyLogin} />
        
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="generatePlaylist" component={GeneratePlaylist} />
          </Stack.Navigator>
        
      </NavigationContainer>
    </GlobalSafeArea>
  );
};

const GlobalSafeArea = styled.SafeAreaView`
  flex: 1;
`;

export default Routes;
