import React, {useState, useEffect} from 'react';
import {Button, View, Text, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} from '@env';
import {
  requestAccessToken,
  fetchUserData,
} from '../services/AuthSpotify.services';

const authURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
  REDIRECT_URI,
)}&scope=user-read-private user-read-email`;

const SpotifyLogin = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);

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
          await AsyncStorage.setItem('accessToken', access_token);
        }
      }
    };

    Linking.addEventListener('url', handleOpenURL);
    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, []);

  useEffect(() => {
    console.log('userData', userData);
    console.log('accessToken', accessToken);
  }, [userData, accessToken]);

  const handleFetchUserData = async () => {
    if (!accessToken) {
      return;
    }
    const expirationTime = await AsyncStorage.getItem('accessTokenExpiration');

    if (new Date().getTime() > parseInt(expirationTime, 10)) {
      // Supprimer le jeton d'accès et demander à l'utilisateur de se reconnecter
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('accessTokenExpiration');
      setAccessToken(null);
      return;
    }

    const fetchedUserData = await fetchUserData(accessToken);
    setUserData(fetchedUserData);
  };

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
          <Button
            title="Récupérer les informations de l'utilisateur"
            onPress={handleFetchUserData}
          />
          {userData && (
            <Text>
              Connecté en tant que : {userData.display_name} ({userData.email})
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default SpotifyLogin;
