import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {
  searchSong,
  createPlaylist,
  addToPlaylist,
} from '../services/AuthSpotify.services';
import axios from 'axios';
import {OPENAI_API_KEY} from '@env';
import CardRow from '../components/CardRow';
import Title from '../components/Title';
import LottieView from 'lottie-react-native';
import GirlListenMusic from '../assets/81966-girl-listening-to-music.json';

const Home = ({route, navigation}) => {
  const token = useSelector(state => state.user.token);
  const {user} = useSelector(state => state.user);
  // console.log(token);
  const [playlistName, setPlaylistName] = useState('Playlist name');

  const handleNameChange = text => {
    setPlaylistName(text);
  };

  const [trackList, setTrackList] = useState({
    tracks: {items: []},
  });

  const [trackUris, setTrackUris] = useState([]);

  const [playlist, setPlaylist] = useState([]);
  const [loadingTrackList, setloadingTrackList] = useState(true);
  const [loadingPlaylist, setloadingPlaylist] = useState(true);

  const generate = async (quantity, driving) => {
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `You are an musician, fitness and JSON formatter expert. Could you make me a tracklist of ${quantity} songs for driving. My driving style is : ${driving}. The result must be in JSON Format his structure is a main key called 'songs' it's an array of song each songs are composed of title and artist i only want the json no useless text with.`,
            // `You are an musician, driver and JSON formatter expert. Could you make me a tracklist of ${quantity} songs for driving. My driving style is : ${driving}. The result must be in JSON Format with title and artist.`,
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
    // console.log(results);
    // console.log(results.songs);
    let items = [];
    await Object.entries(results.songs).map(([key, song]) => {
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
          // trackList.tracks.items.map(item => {
          //   console.log(item.uri);
          // });
        });
    });
  };

  useEffect(() => {
    const numberOfSongs = route.params.numberOfSongs;
    const drivingStyle = route.params.drivingStyle;
    generate(numberOfSongs, drivingStyle);
    // console.log(token, playlist.id, trackUris);
    if (loadingTrackList === false) {
      createPlaylist(token, user, drivingStyle)
        .then(res => {
          setPlaylist(res);
          console.log(res);
        })
        .finally(() => {
          setloadingPlaylist(false);
        });
    }

    // return () => {
    //   setPlaylist([]);
    //   setTrackList({tracks: {items: []}});
    //   setloadingPlaylist(true);
    //   setloadingTrackList(true);
    // };
  }, []);

  const addToSpotify = async => {
    let trackUris = [];

    trackList.tracks.items.map(item => {
      trackUris.push(item.uri);
    });
    createPlaylist(token, user, playlistName).then(res => {
      addToPlaylist(token, res.id, trackUris);
      navigation.navigate('Playlist', {playlist: res.id});
    });
  };

  return (
    <HomeView>
      <LibraryHeader>
        {user.images?.length > 0 && (
          <ProfilImage
            style={{width: 35, height: 35}}
            source={{
              uri: user.images[0].url,
            }}
          />
        )}

        <Title title="Generate a new playlist" />
      </LibraryHeader>

      {!loadingTrackList ? (
        <>
          <PlaylistNameInput
            value={playlistName}
            onChangeText={handleNameChange}
          />
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
        <LoadingContainer>
          <LottieView source={GirlListenMusic} autoPlay loop />
        </LoadingContainer>
      )}
    </HomeView>
  );
};

const HomeView = styled.View`
  flex: 1;
  background: #121212;
`;

const LibraryHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

const ProfilImage = styled.Image`
  border-radius: 50px;
  margin-right: 10px;
`;

const PlaylistNameInput = styled.TextInput`
  text-align: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  text-decoration: underline;
`;

const StyledText = styled.Text`
  color: black;
`;

const StyledTouchable = styled.TouchableOpacity`
  border: 1px;
  border-color: white;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #000000;
`;

const LoadingIndicator = styled.ActivityIndicator`
  margin-top: 20px;
`;

export default Home;
