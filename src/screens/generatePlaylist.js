import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import jwtDecode from 'jwt-decode';
import {
  searchSong,
  createPlaylist,
  addToPlaylist,
} from '../services/AuthSpotify.services';
import {OPENAI_API_KEY} from '@env';
import CardRow from '../components/CardRow';

const GeneratePlaylist = ({navigation}) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const {user} = useSelector(state => state.user);
  const [trackList, setTrackList] = useState({
    tracks: {items: []},
  });

  const [trackUris, setTrackUris] = useState([]);

  const [playlist, setPlaylist] = useState([]);
  const [loadingTrackList, setloadingTrackList] = useState(true);
  const [loadingPlaylist, setloadingPlaylist] = useState(true);
  const [tempo, setTempo] = useState(110);

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
              // 'You are an musician, fitness and JSON formatter expert. Could you make me a tracklist of 10 unpopular songs with a tempo that match my BPM. My BPM is currently at 110. The result must be in JSON Format with title and artist.',
              "You are an musician, fitness and JSON formatter expert. Could you make me a tracklist of 2 unpopular songs with a tempo that match my BPM. My BPM is currently at 110. The result must be in JSON Format his structure is a main key called 'songs' it's an array of song each songs are composed of title and artist i only want the json no useless text with.",
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
    const results = JSON.parse(openaiResponse.data.choices[0].message.content);

    // let results = JSON.parse(
    //   `{"songs": [{"artist": "Childish Gambino", "title": "Feels Like Summer"}, {"artist": "Willow", "title": "Wait a Minute!"}, {"artist": "Lost Kings feat. Wiz Khalifa & Social House", "title": "Don't Kill My High"}, {"artist": "Sofi Tukker feat. NERVO, The Knocks & Alisa Ueno", "title": "Best Friend"}, {"artist": "ZAYN feat. Snakehips", "title": "Cruel"}, {"artist": "Basenji feat. Tkay Maidza", "title": "Can't Get Enough"}, {"artist": "Major Lazer feat. Travis Scott, Camila Cabello & Quavo", "title": "Know No Better"}, {"artist": "G-Eazy feat. Halsey", "title": "Him & I"}, {"artist": "Juice WRLD", "title": "Lucid Dreams"}, {"artist": "Nickelback", "title": "Live It Up"}]}`,
    // );
    // console.log(fake);

    // console.log('1', fake);
    // const songs = openaiResponse.data.choices.map(choice => {
    //   chatGptPlaylist = JSON.parse(choice.message.content);
    // });

    let items = [];
    Object.entries(results.songs).map(([key, song]) => {
      searchSong(token, song)
        .then(res => {
          setTrackList(prevState => {
            return {
              ...prevState,
              tracks: {
                ...prevState.tracks,
                items: [...prevState.tracks.items, ...res.tracks.items],
              },
            };
          });
        })
        .catch(err => console.log(err))
        .finally(() => {
          setloadingTrackList(false);
          trackList.tracks.items.map(item => {
            console.log(item.uri);
          });
        });
    });

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
    if (loadingTrackList === false) {
      createPlaylist(token, user, tempo)
        .then(res => {
          setPlaylist(res);
        })
        .finally(() => {
          setloadingPlaylist(false);
        });
    }
  }, [loadingTrackList]);

  // useEffect(() => {
  //   if (loadingPlaylist === false) {
  //     console.log("test");
  //     // console.log(playlist.id);

  //     console.log("Track uris : " + trackUris);
  //     addToPlaylist(token, playlist.id, trackUris);

  //   }
  // }, [loadingPlaylist]);

  const addToSpotify = async () => {
    let trackUris = [];
    trackList.tracks.items.map(item => {
      trackUris.push(item.uri);
    });

    console.log(trackUris);

    addToPlaylist(token, playlist.id, trackUris);
    navigation.navigate('Playlist', {playlist: playlist.id});
  };

  useEffect(() => {
    //AsyncStorage.removeItem("accessToken");
    AsyncStorage.getItem('accessToken').then(token => {
      setToken(token);
      console.log(token);
    });
  }, []);

  return (
    <Container>
      <StyledText>{user.id}</StyledText>
      <StyledTouchable
        onPress={() => {
          generate(tempo);
        }}>
        <StyledText>generate</StyledText>
      </StyledTouchable>
      {!loadingTrackList ? (
        <>
          {trackList.tracks.items.map(song => (
            <CardRow
              key={song.id}
              img={song.album.images[0].url}
              width={50}
              height={50}
              title={song.name}
              artist={song.artists[0].name}
              hasActions={true}
            />
          ))}

          <StyledTouchable
            onPress={() => {
              addToSpotify();
            }}>
            <StyledText>Add Playlist to Spotify</StyledText>
          </StyledTouchable>
        </>
      ) : (
        <StyledText>Loading</StyledText>
      )}
    </Container>
  );
};

const Container = styled.View`
  background: #121212;
  flex: 1;
`;
const StyledText = styled.Text`
  color: white;
  font-size: 20px;
`;
const StyledTouchable = styled.TouchableOpacity`
  border: 1px;
  border-color: white;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export default GeneratePlaylist;
