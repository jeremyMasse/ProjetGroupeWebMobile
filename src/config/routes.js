import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Vinyle from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import ModalProvider from '../context/ModalContext';
import SpotifyLogin from '../screens/spotifyLogin';
import Library from '../screens/library';
import Playlist from '../screens/playlist';
import PlaylistGenerator from '../screens/playlistGenerator';
import ConfigurePlaylist from '../screens/configurePlaylist';
import CategoriesGeneratePlaylist from '../screens/categoriesGeneratePlaylist';
import Profil from '../screens/profil';
import Player from '../components/Player';
import Favorites from '../screens/favorites';

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
        name="CategoriesGeneratePlaylist"
        component={CategoriesGeneratePlaylist}
        options={{
          tabBarLabel: t('header.addPlaylist'),
          tabBarIcon: CategoriesGeneratePlaylist => {
            return (
              <Vinyle
                name="record-vinyl"
                size={24}
                color={CategoriesGeneratePlaylist.focused ? '#fff' : '#8e8e93'}
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
        name="PlaylistGenerator"
        component={PlaylistGenerator}
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
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: false,
          unmountOnBlur: true,
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
