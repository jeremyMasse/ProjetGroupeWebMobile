import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Home from '../screens/home';
import SpotifyLogin from '../screens/spotifyLogin';
import Library from '../screens/library';
import Playlist from '../screens/playlist';
import GeneratePlaylist from '../screens/generatePlaylist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Vinyle from 'react-native-vector-icons/FontAwesome5';
import Player from '../components/Player';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown: false,
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: '#8e8e93',
      tabBarStyle: {
        height: 55,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.90)',
      },
      tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarIconStyle: {},
    })}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: tabHome => {
          return (
            <Icon
              name="home-outline"
              size={25}
              color={tabHome.focused ? '#fff' : '#8e8e93'}
            />
          );
        },
      }}
    />
    <Tab.Screen
      name="GeneratePlaylist"
      component={GeneratePlaylist}
      options={{
        tabBarLabel: 'Add Playlist',
        tabBarIcon: tabGeneratePlaylist => {
          return (
            <Vinyle
              name="record-vinyl"
              size={24}
              color={tabGeneratePlaylist.focused ? '#fff' : '#8e8e93'}
            />
          );
        },
      }}
    />
    <Tab.Screen
      name="Library"
      component={Library}
      options={{
        tabBarLabel: 'Your Library',
        tabBarIcon: tabLibrary => {
          return (
            <Icon
              name="library-outline"
              size={24}
              color={tabLibrary.focused ? '#fff' : '#8e8e93'}
            />
          );
        },
      }}
    />

    <Tab.Screen
      name="Playlist"
      component={Playlist}
      options={{
        headerShown: false,
        tabBarItemStyle: {
          display: 'none',
        },
      }}
    />

    <Tab.Screen
      name="Spotify Login"
      component={SpotifyLogin}
      options={{
        tabBarLabel: 'Spotify Login',
        tabBarIcon: tabAccount => {
          return (
            <Icon
              name="person-outline"
              size={24}
              color={tabAccount.focused ? '#fff' : '#8e8e93'}
            />
          );
        },
      }}
    />
  </Tab.Navigator>
);

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
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalSafeArea>
  );
};

const GlobalSafeArea = styled.SafeAreaView`
  flex: 1;
`;

export default Routes;
