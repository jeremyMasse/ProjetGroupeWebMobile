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

  const generate = async tempo => {
    // Appeler l'API OpenAI pour générer une liste de chansons de course à pied avec un tempo adapté à la vitesse de course de l'utilisateur
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content:
              'you are an musician and fitness expert, make me a list of songs for a jogger that match the bpm of the jogger, his current bpm is 120 json format',
          },
        ],
        // stop: ['\n'],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const songs = openaiResponse.data.choices.map(choice =>
      console.log(choice),
    );

    console.log(songs);
    // const spotifyResponse = await axios.get(
    //   'https://api.spotify.com/v1/search',
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //     params: {
    //       q: songs,
    //       type: 'track',
    //       market: 'US',
    //     },
    //   },
    // );

    // const playlist = await axios.post(
    //   `https://api.spotify.com/v1/users/${user.id}/playlists`,
    //   {
    //     name: `Running Playlist (${tempo} BPM)`,
    //     description: 'A playlist generated by OpenAI for running',
    //     public: true,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       'Content-Type': 'application/json',
    //     },
    //   },
    // );

    // Ajouter les chansons à la playlist
    // const playlistId = playlist.data.id;
    // const trackUris = spotifyResponse.data.tracks.items.map(track => track.uri);
    // console.log(playlistId);
    // console.log(trackUris);
    // await axios.post(
    //   `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    //   {
    //     uris: trackUris,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       'Content-Type': 'application/json',
    //     },
    //   },
    // );
    // console.log(playlist.data);
    // return playlist.data;
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
