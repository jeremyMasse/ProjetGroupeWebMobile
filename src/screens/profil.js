import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

import axios from 'axios';

import {useDispatch, useSelector} from 'react-redux';

import Profile from '../components/ProfilUser';
import LottieView from 'lottie-react-native';
import GirlListenMusic from '../assets/81966-girl-listening-to-music.json';
import styled from 'styled-components/native';

const SpotifyProfile = () => {
  const {user} = useSelector(state => state.user);

  useEffect(() => {
    console.log('userfff', user);
    // const fetchSpotifyProfile = async () => {
    //   const token = await AsyncStorage.getItem('accessToken');
    //   if (token) {
    //     try {
    //       const response = await axios.get('https://api.spotify.com/v1/me', {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
    //       const {display_name, email, images} = response.data;
    //       const userProfile = {
    //         displayName: display_name,
    //         email,
    //         photoUrl: images[0]?.url || '',
    //         bio: 'Spotify user',
    //       };
    //       setUser(userProfile);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   }
    // };
    // fetchSpotifyProfile();
  }, [user]);

  return (
    <>
      {Object.keys(user).length !== 0 ? (
        <Profile user={user} />
      ) : (
        <LoadingContainer>
          <LottieView source={GirlListenMusic} autoPlay loop />
          <LoadingIndicator />
        </LoadingContainer>
      )}
    </>
  );
};

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
`;

const LoadingIndicator = styled.ActivityIndicator`
  margin-top: 20px;
`;

export default SpotifyProfile;
