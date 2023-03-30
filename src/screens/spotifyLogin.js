import React, {useState, useEffect} from 'react';
import {Button, View, Text, Linking} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import base64 from 'react-native-base64';

const clientID = 'd415d43aff264b4782a932529f87dc76';
const clientSecret = '507bce648e454a97ba4be3d2b93e7eb1';
const redirectURI = 'myapp://spotify-auth-callback';

const authURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&redirect_uri=${encodeURIComponent(redirectURI)}&scope=user-read-private`;

const SpotifyLogin = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
      }
    };
    fetchAccessToken();
   
    const handleOpenURL = async (event) => {
      const code = event.url.split('code=')[1];
      if (code) {
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
          params: {
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectURI,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${base64.encode(`${clientID}:${clientSecret}`)}`,
          },
        });
        console.log(response.data);
        const {access_token} = response.data;
        setAccessToken(access_token);
        await AsyncStorage.setItem('accessToken', access_token);
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

  const fetchUserData = async () => {
    if (!accessToken) return;

    const headers = {Authorization: `Bearer ${accessToken}`};

    // Récupérer les informations de l'utilisateur
    const userResponse = await axios.get('https://api.spotify.com/v1/me', {headers});
    setUserData(userResponse.data);
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
          <Button title="Récupérer les informations de l'utilisateur" onPress={fetchUserData} />
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