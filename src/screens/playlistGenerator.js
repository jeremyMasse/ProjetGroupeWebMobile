import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
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
import {handlePlay} from '../services/Player.service';
import {player, saveTrack} from '../actions/player';
import {err} from 'react-native-svg/lib/typescript/xml';
import notifee from '@notifee/react-native';

const Home = ({route, navigation}) => {
  const token = useSelector(state => state.user.token?.access_token);
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [playlistName, setPlaylistName] = useState('Playlist name');

  const handleNameChange = text => {
    setPlaylistName(text);
  };

  const [trackList, setTrackList] = useState({
    tracks: {items: []},
  });

  const [playlist, setPlaylist] = useState([]);
  const [loadingTrackList, setloadingTrackList] = useState(true);
  const [loadingPlaylist, setloadingPlaylist] = useState(true);

  const generate = async (quantity, param, option) => {
    let results = null;
    let promptGenre = '';
    if (option.length !== 0) {
      promptGenre += 'that the kind are only: ';
      promptGenre += option.join(', ');
    }

    if (param.type === 'driving') {
      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: `You are an musician, fitness and JSON formatter expert. Could you make me a tracklist of ${quantity} songs ${promptGenre} for driving. My driving style is : ${param.value}.The result must be in JSON Format his structure is a main key called 'songs' it's an array of song each songs are composed of title and artist i only want the json no useless text with.`,
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
      results = JSON.parse(openaiResponse.data.choices[0].message.content);
    } else {
      const openaiResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content:
                // 'You are an musician, fitness and JSON formatter expert. Could you make me a tracklist of 10 unpopular songs with a tempo that match my BPM. My BPM is currently at 110. The result must be in JSON Format with title and artist.',
                `You are an musician, fitness and JSON formatter expert. Could you make me a tracklist of ${quantity} unpopular songs ${promptGenre} with a tempo that match my BPM. My BPM is currently at ${param.value}. The result must be in JSON Format his structure is a main key called 'songs' it's an array of song each songs are composed of title and artist i only want the json no useless text with.`,
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
      results = JSON.parse(openaiResponse.data.choices[0].message.content);
    }

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
        .catch(err => console.log('err: ', err))
        .finally(() => {
          setloadingTrackList(false);
        });
    });
  };

  useEffect(() => {
    const numberOfSongs = route.params.numberOfSongs;
    const drivingStyle = route.params.drivingStyle;
    const OptionGenre = route.params.genres;
    generate(numberOfSongs, drivingStyle, OptionGenre);
    if (loadingTrackList === false) {
      createPlaylist(token, user, drivingStyle)
        .then(res => {
          setPlaylist(res);
          console.log(res);
        })
        .catch(error => {})
        .finally(() => {
          setloadingPlaylist(false);
        });
    }
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

  async function onDisplayNotification(body) {
    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'New playlist has been add in your spotify library',
      body: body,

      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }

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
          {trackList.tracks.items.map(track => (
            <Touchable
              onPress={() => {
                handlePlay(track);
                dispatch(player(true));
                dispatch(saveTrack(track));
              }}>
              <CardRow
                key={track.id}
                img={track.album.images[0].url}
                width={50}
                height={50}
                title={track.name}
                artist={track.artists[0].name}
                hasActions={true}
              />
            </Touchable>
          ))}

          <StyledTouchable
            onPress={() => {
              addToSpotify();
              onDisplayNotification(playlistName).catch(err =>
                console.log(err),
              );
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
  background-color: ${({theme}) => theme.theme.background};
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
  color: ${({theme}) => theme.theme.text};
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  text-decoration: underline;
`;

const StyledText = styled.Text`
  color: #2ecc71;
  text-transform: uppercase;
  font-weight: bold;
`;

const StyledTouchable = styled.TouchableOpacity`
  border: 2px solid #2ecc71;
  padding: 10px 30px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #000000;
`;

const Touchable = styled.TouchableOpacity``;

export default Home;
