import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Vinyle from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import ModalProvider from '../context/ModalContext';
import Home from '../screens/home';
import SpotifyLogin from '../screens/spotifyLogin';
import Library from '../screens/library';
import Playlist from '../screens/playlist';
import GeneratePlaylist from '../screens/generatePlaylist';
import PlaylistGenerator from '../screens/playlistGenerator';
import ConfigurePlaylist from '../screens/configurePlaylist';
import GeneratePlaylist2 from '../screens/generatePlaylist2';
import Profil from '../screens/profil';
import Player from '../components/Player';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function withAuthentication(Component) {
  function AuthenticatedComponent(props) {
    const token = useSelector(state => state.user.token);
    if (token === null && props.route.name !== 'Login') {
      return <SpotifyLogin />;
    }

    return <Component {...props} />;
  }

  return AuthenticatedComponent;
}

const TabNavigator = () => {
  const {t} = useTranslation();

  return (
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
        name="PlaylistGenerator"
        component={PlaylistGenerator}
        options={{
          tabBarLabel: t('header.addPlaylist'),
          tabBarIcon: tabPlaylistGenerator => {
            return (
              <Vinyle
                name="record-vinyl"
                size={24}
                color={tabPlaylistGenerator.focused ? '#fff' : '#8e8e93'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="ConfigurePlaylist"
        component={ConfigurePlaylist}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarItemStyle: {
            display: 'none',
          },
        }}
      />
      <Tab.Screen
        name="GeneratePlaylist"
        component={GeneratePlaylist}
        options={{
          headerShown: false,
          tabBarItemStyle: {
            display: 'none',
          },
        }}
      />

      <Tab.Screen
        name="GeneratePlaylist2"
        component={GeneratePlaylist2}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarItemStyle: {
            display: 'none',
          },
        }}
      />

      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarLabel: t('header.library'),
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
        name="Profil"
        component={Profil}
        options={{
          tabBarLabel: t('header.profil'),
          tabBarIcon: tabLibrary => {
            return (
              <Icon
                name="person-outline"
                size={24}
                color={tabLibrary.focused ? '#fff' : '#8e8e93'}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  return (
    <GlobalSafeArea>
      <NavigationContainer>
        <ModalProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen
              name="TabNavigator"
              component={withAuthentication(TabNavigator)}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="SpotifyLogin"
              component={SpotifyLogin}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
          <Player />
        </ModalProvider>
      </NavigationContainer>
    </GlobalSafeArea>
  );
};

const GlobalSafeArea = styled.SafeAreaView`
  flex: 1;
`;

export default Routes;
