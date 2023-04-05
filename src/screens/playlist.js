import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Pressable
} from 'react-native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import CardRow from '../components/CardRow';
import Title from '../components/Title';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionRow from '../components/ActionRow';
import {useDispatch, useSelector} from 'react-redux';
import Player from '../components/Player';
import { player } from "../actions/player";
import { saveTrack } from "../actions/player";
import { getPlaylist, getPlaylistTracks, deleteTrackFromPlaylist } from '../services/Playlist.service';
const Playlist = ({route}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);
    const token = useSelector(state => state.user.token);

    const [playlist, setPlaylist] = useState([]);
    const [tracks, setTracks] = useState([]);

    const isPlaying = useSelector((state) => state.player.isPlaying);
    const track = useSelector((state) => state.player.track);

    useEffect(() => {
      const playlist_id = route.params.playlist;

      getPlaylist(token, playlist_id)
        .then(res => setPlaylist(res))
        .catch(error => console.log(error));


      getPlaylistTracks(token, playlist_id)
        .then(res => setTracks(res.items))
        .catch(error => console.log(error));
    
      
      
    }, [route.params.playlist])


    const handlePlay = (track) => {
    
      // Get the user's available devices
      axios.get('https://api.spotify.com/v1/me/player/devices', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        const devices = response.data.devices;
        console.log(response);
        // Find an active device and start playback
        const activeDevice = devices.find(device => device.is_active);
        if (activeDevice) {
          axios.put('https://api.spotify.com/v1/me/player/play', {
            uris: [`${track.track.uri}`],
            position_ms: 0
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }).then(response => {
            console.log(response);
          }).catch(error => {
            console.log(error);
          });
        } else {
          // Transfer playback to the first available device
          const firstDevice = devices[0];
          axios.put(`https://api.spotify.com/v1/me/player`, {
            device_ids: [firstDevice.id],
            play: true
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            }
          }).then(response => {
            console.log(response);
            // Start playback after transferring device
            axios.put('https://api.spotify.com/v1/me/player/play', {
              uris: [`${track.track.uri}`],
              position_ms: 0
            }, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
            }).then(response => {
              console.log(response);
            }).catch(error => {
              console.log(error);
            });
          }).catch(error => {
            console.log(error);
          });
        }
      }).catch(error => {
        console.log(error.response.status);
        console.log(error.response.data);
      });
      console.log(token);
      // dispatch(player(true));
      // dispatch(saveTrack(track));
      // console.log(track.track.uri);
    };
    

    return (
        <PlaylistView>
            <PlaylistHeader>
              <Icon name="arrow-back" size={30} color="#fff" onPress={() => navigation.navigate('Library')} />
              {playlist.images && playlist.images[0] && playlist.images[0].url && (
              <PlaylistImage source={{uri: playlist.images && playlist.images[0].url}}
                style={{width: 200, height: 200}}
              />
              )}
              <Title title={playlist.name} />
              <Owner>
                <OwnerImage
                style={{width: 25, height: 25}}
                source={{
                  uri: user.images && user.images[0].url,
                }} />
                <OwnerName>{playlist.owner && playlist.owner.display_name}</OwnerName>
              </Owner>
            </PlaylistHeader>
            {tracks && tracks.map(track => (
          
              <Touchable onPress={() => handlePlay(track)}>
                <CardRow 
                  key={track.track.id}
                  title={track.track.name}
                  artist={track.track.artists.map(artist => `${(artist.name)}, `)}
                  img={track.track.album.images[0].url}
                  width={50}
                  height={50}
                  hasActions={true}
                >
                  <ActionRow title="Remove from this playlist" icon="remove-circle-outline" onPress={() => deleteTrackFromPlaylist(token, playlist.id, track.track.uri, track.track.name, playlist.name, setTracks)}/>
                  <ActionRow title="Share" icon="share-social-outline"/>
                </CardRow>
              </Touchable>
              ))}
              
        </PlaylistView>
    )
}

const PlaylistView = styled.View`
    background: #121212;
    flex: 1;
`

const PlaylistHeader = styled.View`
`

const Owner = styled.View`
  flex-direction: row;
  align-items: center;
`

const OwnerImage = styled.Image`
  border-radius: 50px;
  margin-right: 10px;
`

const OwnerName = styled.Text`
  color: white;
  font-weight: bold;
  margin: 15px 0;
`

const PlaylistImage = styled.Image`
  margin: 0 auto;
`

const Touchable = styled.TouchableOpacity`
`;

export default Playlist;