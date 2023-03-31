import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';
import {OPENAI_API_KEY} from '@env';

const GeneratePlaylist = ({navigation}) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const {user} = useSelector(state => state.user);

  //const OPENAI_API_KEY = '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';

  const generate = async tempo => {
    // Appeler l'API OpenAI pour générer une liste de chansons de course à pied avec un tempo adapté à la vitesse de course de l'utilisateur
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/engines/davinci/completions',
      {
        prompt: `Generate a list of running songs with a tempo of ${tempo}`,
        max_tokens: 100,
        n: 5,
        stop: ['\n'],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const songs = openaiResponse.data.choices[0].text.trim();
    const spotifyResponse = await axios.get(
      'https://api.spotify.com/v1/search',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: songs,
          type: 'track',
          market: 'US',
        },
      },
    );

    const playlist = await axios.post(
      `https://api.spotify.com/v1/users/${user.id}/playlists`,
      {
        name: `Running Playlist (${tempo} BPM)`,
        description: 'A playlist generated by OpenAI for running',
        public: true,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // Ajouter les chansons à la playlist
    const playlistId = playlist.data.id;
    const trackUris = spotifyResponse.data.tracks.items.map(track => track.uri);
    console.log(playlistId);
    console.log(trackUris);
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris: trackUris,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    console.log(playlist.data);
    return playlist.data;
  };

  useEffect(() => {
    //AsyncStorage.removeItem("accessToken");
    AsyncStorage.getItem('accessToken').then(token => {
      setToken(token);
    });
  }, []);
  return (
    <Container>
      <StyledText>{user.id}</StyledText>
      <StyledTouchable
        onPress={() => {
          generate(120);
        }}>
        <StyledText>generate</StyledText>
      </StyledTouchable>
    </Container>
  );
};

const Container = styled.View``;
const StyledText = styled.Text`
  color: black;
  font-size: 12px;
`;
const StyledTouchable = styled.TouchableOpacity`
  border: 1px;
  border-color: black;
`;
export default GeneratePlaylist;
