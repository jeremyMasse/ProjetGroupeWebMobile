import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

import axios from 'axios';

import {useDispatch, useSelector} from 'react-redux';

import Profile from '../components/ProfilUser';

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

  return <>{user && <Profile user={user} />}</>;
};

export default SpotifyProfile;
