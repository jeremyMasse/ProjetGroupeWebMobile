import React, {useState, useEffect} from 'react';
import {Button, View, Text, Linking} from 'react-native';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import base64 from 'react-native-base64';
import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} from '@env';
import {saveUser, saveToken} from '../actions/user';
import {useDispatch, useSelector} from 'react-redux';

const authURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
  REDIRECT_URI,
)}&scope=user-read-private,playlist-modify-public`;

const SpotifyLogin = ({navigation}) => {
  const [accessToken, setAccessToken] = useState(null);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
      }
    };
    fetchAccessToken();

    const handleOpenURL = async event => {
      const code = event.url.split('code=')[1];
      if (code) {
        const response = await axios.post(
          'https://accounts.spotify.com/api/token',
          null,
          {
            params: {
              grant_type: 'authorization_code',
              code,
              redirect_uri: REDIRECT_URI,
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${base64.encode(
                `${CLIENT_ID}:${CLIENT_SECRET}`,
              )}`,
            },
          },
        );
        const {access_token} = response.data;
        setAccessToken(access_token);
        await AsyncStorage.setItem('accessToken', access_token);
      }
    };
    Linking.addEventListener('url', handleOpenURL);
  }, []);

  useEffect(() => {
    if (accessToken !== null && Object.keys(user).length === 0) {
      dispatch(saveToken(token));
      const fetchUserData = () => {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        // Récupérer les informations de l'utilisateur
        axios
          .get('https://api.spotify.com/v1/me', {headers})
          .then(userResponse => {
            dispatch(saveUser(userResponse.data));
          })
          .catch(error => {
            console.error(error);
          })
          .finally(() => {
            navigation.navigate('generatePlaylist');
          });
      };
      fetchUserData();
    }
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
