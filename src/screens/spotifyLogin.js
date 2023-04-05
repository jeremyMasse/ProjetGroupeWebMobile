import React, {useState, useEffect} from 'react';
import {Button, View, Text, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} from '@env';
import {
  requestAccessToken,
  fetchUserData,
} from '../services/AuthSpotify.services';
import {saveUser, saveToken} from '../actions/user';

const SpotifyLogin = ({navigation}) => {
  const authURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI,
  )}&scope=user-read-private,playlist-modify-public,user-modify-playback-state`;

  const [accessToken, setAccessToken] = useState(null);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user.user);
  const token = useSelector(state => state.user.token);

  const fetchAccessToken = async () => {
    const storedAccessToken = await AsyncStorage.getItem('accessToken');
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  };

  useEffect(() => {


    fetchAccessToken();

    const handleOpenURL = async event => {
      const code = event.url.split('code=')[1];
      if (code) {
        const {access_token, expires_in} = await requestAccessToken(
          code,
          CLIENT_ID,
          CLIENT_SECRET,
          REDIRECT_URI,
        );

        if (access_token && expires_in) {
          const expirationTime = new Date().getTime() + expires_in * 1000;
          await AsyncStorage.setItem(
            'accessTokenExpiration',
            expirationTime.toString(),
          );

          setAccessToken(access_token);
          dispatch(saveToken(access_token));
          await AsyncStorage.setItem('accessToken', access_token);
        }
      }
    };
    Linking.addEventListener('url', handleOpenURL);
  }, []);

  useEffect(() => {
    const handleFetchUserData = async () => {
      if (!accessToken && Object.keys(user).length === 0) {
        return;
      }
      const expirationTime = await AsyncStorage.getItem(
        'accessTokenExpiration',
      );

      if (new Date().getTime() > parseInt(expirationTime, 10)) {
        // Supprimer le jeton d'accès et demander à l'utilisateur de se reconnecter
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('accessTokenExpiration');
        setAccessToken(null);
        return;
      }

      fetchUserData(accessToken)
        .then(userResponse => {
          console.log(userResponse);
          dispatch(saveUser(userResponse));
          dispatch(saveToken(accessToken));
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          navigation.navigate('generatePlaylist');
        });
    };

    handleFetchUserData();
  }, [accessToken]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {!accessToken && (
        <Button
          title="Se connecter à Spotify"
          onPress={() => Linking.openURL(authURL)}
        />
      )}
      {accessToken && (
        <>
          {user && (
            <Text style={{color: 'black'}}>
              Connecté en tant que : {user.display_name} ({user.email})
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default SpotifyLogin;