import React, {useEffect, useState, useContext} from 'react';
import {Text} from 'react-native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import {ModalContext} from '../context/ModalContext';
import TrackPlayer from 'react-native-track-player';
//Components
import ActionRow from '../components/ActionRow';
import Player from '../components/Player';
import CardRow from '../components/CardRow';
import Title from '../components/Title';

//Redux
import {saveModal, saveType} from '../actions/modal';
import {useDispatch, useSelector} from 'react-redux';
import {player, saveTrack} from '../actions/player';
import {
  getPlaylist,
  getPlaylistTracks,
  deleteTrackFromPlaylist,
} from '../services/Playlist.service';
import {handlePlay} from '../services/Player.service';

const Playlist = ({route}) => {
  console.log('test');

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const {handleSnapPress} = useContext(ModalContext);
  const token = useSelector(state => state.user.token);

  const [playlist, setPlaylist] = useState([]);
  const [tracks, setTracks] = useState([]);

  const isPlaying = useSelector(state => state.player.isPlaying);
  const track = useSelector(state => state.player.track);

  const handleModal = track => {
    handleSnapPress(0);
    dispatch(saveModal(track));
    dispatch(saveType('track'));
  };

  useEffect(() => {
    const playlist_id = route.params.playlist;

    getPlaylist(token.access_token, playlist_id)
      .then(res => setPlaylist(res))
      .catch(error => console.log(error));

    getPlaylistTracks(token.access_token, playlist_id)
      .then(res => setTracks(res.items))
      .catch(error => console.log(error));
  }, [route.params.playlist]);

  // const handlePlay = async track => {
  // Get the user's available devices

  // axios
  //   .get('https://api.spotify.com/v1/me/player/devices', {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .then(response => {
  //     const devices = response.data.devices;
  //     // console.log(response.data.devices);
  //     // Find an active device and start playback
  //     const activeDevice = devices.find(device => device.is_active);
  //     if (activeDevice) {
  //       axios
  //         .put(
  //           'https://api.spotify.com/v1/me/player/play',
  //           {
  //             uris: [`${track.track.uri}`],
  //             position_ms: 0,
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //               'Content-Type': 'application/json',
  //             },
  //           },
  //         )
  //         .then(response => {
  //           // console.log(response);
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  //     } else {
  //       // Transfer playback to the first available device
  //       const firstDevice = devices[0];
  //       axios
  //         .put(
  //           'https://api.spotify.com/v1/me/player',
  //           {
  //             device_ids: [firstDevice.id],
  //             play: true,
  //           },
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //               'Content-Type': 'application/json',
  //             },
  //           },
  //         )
  //         .then(response => {
  //           // Start playback after transferring device
  //           axios
  //             .put(
  //               'https://api.spotify.com/v1/me/player/play',
  //               {
  //                 uris: [`${track.track.uri}`],
  //                 position_ms: 0,
  //               },
  //               {
  //                 headers: {
  //                   Authorization: `Bearer ${token}`,
  //                   'Content-Type': 'application/json',
  //                 },
  //               },
  //             )
  //             .then(response => {
  //               // console.log(response.data);
  //             })
  //             .catch(error => {
  //               console.log(error);
  //             });
  //         })
  //         .catch(error => {
  //           console.log(error);
  //         });
  //     }
  //   })
  //   .catch(error => {
  //     // console.log(error.response.status);
  //     // console.log(error.response.data);
  //   });
  //   console.log(token);
  //   dispatch(player(true));
  //   dispatch(saveTrack(track));
  // };

  return (
    <PlaylistView>
      <PlaylistHeader>
        <Icon
          name="arrow-back"
          size={30}
          color="#fff"
          onPress={() => navigation.navigate('Library')}
        />
        {tracks && tracks.length > 0 && (
          <PlaylistImage
            source={{uri: playlist.images && playlist.images[0]?.url}}
            style={{width: 200, height: 200}}
          />
        )}
        <Title title={playlist.name} />
        <Owner>
          {user.images?.length > 0 && (
            <OwnerImage
              style={{width: 35, height: 35}}
              source={{
                uri: user.images[0].url,
              }}
            />
          )}
          <OwnerName>{playlist.owner && playlist.owner.display_name}</OwnerName>
        </Owner>
      </PlaylistHeader>
      {tracks &&
        tracks.map(track => (
          <Touchable
            onPress={() => {
              handlePlay(track.track);
              dispatch(player(true));
              dispatch(saveTrack(track.track));
            }}
            key={track.id}>
            <CardRow
              key={track.track.id}
              title={track.track.name}
              artist={track.track.artists.map(artist => `${artist.name}, `)}
              img={track.track.album.images[0].url}
              width={50}
              height={50}
              hasActions={true}
              onPress={() => handleModal(track)}>
              <ActionRow
                title="Remove from this playlist"
                icon="remove-circle-outline"
                onPress={() =>
                  deleteTrackFromPlaylist(
                    token.access_token,
                    playlist.id,
                    track.track.uri,
                    track.track.name,
                    playlist.name,
                    setTracks,
                  )
                }
              />
              <ActionRow title="Share" icon="share-social-outline" />
            </CardRow>
          </Touchable>
        ))}
    </PlaylistView>
  );
};

const PlaylistView = styled.ScrollView`
  background: #121212;
  flex: 1;
`;

const PlaylistHeader = styled.View``;

const Owner = styled.View`
  flex-direction: row;
  align-items: center;
`;

const OwnerImage = styled.Image`
  border-radius: 50px;
  margin-right: 10px;
`;

const OwnerName = styled.Text`
  color: white;
  font-weight: bold;
  margin: 15px 0;
`;

const PlaylistImage = styled.Image`
  margin: 0 auto;
`;

const Touchable = styled.TouchableOpacity``;

export default Playlist;
