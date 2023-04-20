import React, {useState, useEffect} from 'react';
import {Button, View, Text, Linking, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {useInterstitialAd, TestIds} from 'react-native-google-mobile-ads';
import {useNavigation} from '@react-navigation/native';

import LottieView from 'lottie-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} from '@env';
import {
  requestAccessToken,
  fetchUserData,
} from '../services/AuthSpotify.services';

import {saveUser, saveToken} from '../actions/user';
import {useTranslation} from 'react-i18next';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.theme.background};
`;

const SpotifyLogo = styled.Image`
  width: 50px;
  height: 50px;
  resize-mode: contain;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({theme}) => theme.theme.text};
  margin-bottom: 70px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: #1ed760;
  padding: 12px 20px;
  border-radius: 24px;
  align-items: center;
  justify-content: center;
`;

const ButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({theme}) => theme.theme.text};
`;

const SpotifyLogin = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const authURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI,
  )}&scope=user-read-private,user-read-email,playlist-modify-public,user-modify-playback-state,user-read-playback-state,user-library-read,user-library-modify`;

  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const [access_token, setAccessToken] = useState(null);

  // Partie sur la pub
  const {isLoaded, load, show} = useInterstitialAd(TestIds.INTERSTITIAL, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    // Start loading the interstitial straight away
    load();
  }, [load]);

  // useEffect(() => {
  //   if (isClosed) {
  //     // Action after the ad is closed
  //     // navigation.navigate('SpotifyLogin');
  //   }
  // }, [isClosed, navigation]);

  useEffect(() => {
    if (isLoaded === true) {
      show();
    }
  }, [isLoaded]);

  //
  useEffect(() => {
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
          setAccessToken({
            access_token,
            expirationTime,
          });
          dispatch(
            saveToken({
              access_token,
              expirationTime,
            }),
          );
        }
      }
    };
    Linking.addEventListener('url', handleOpenURL);
  }, []);

  useEffect(() => {
    const handleFetchUserData = async () => {
      if (access_token) {
        fetchUserData(access_token.access_token)
          .then(userResponse => {
            dispatch(saveUser(userResponse));
            navigation.navigate('Profil');
          })
          .catch(error => {
            console.error(error);
          });
      }
    };

    handleFetchUserData();
  }, [access_token]);

  return (
    <Container>
      <Title>{t('loginSpotify.title')}</Title>
      {!token && (
        <StyledButton onPress={() => Linking.openURL(authURL)}>
          <ButtonContent>
            <SpotifyLogo source={require('../assets/logo_spotify.png')} />
            <ButtonText>{t('loginSpotify.titleButton')}</ButtonText>
          </ButtonContent>
        </StyledButton>
      )}
      <LottieView
        source={require('../assets/music-bar.json')}
        autoPlay
        loop
        style={{width: 100, height: 100, marginTop: 50}}
      />
    </Container>
  );
};

export default SpotifyLogin;
