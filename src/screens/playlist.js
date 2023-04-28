import React, {useEffect, useState, useContext} from 'react';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ModalContext} from '../context/ModalContext';

//Components
import Player from '../components/Player';
import CardRow from '../components/CardRow';
import Title from '../components/Title';

//Redux
import {saveModal, saveType} from '../actions/modal';
import {useDispatch, useSelector} from 'react-redux';
import {player, saveTrack} from '../actions/player';

import {getPlaylist, getPlaylistTracks} from '../services/Playlist.service';
import {handlePlay} from '../services/Player.service';

const Playlist = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const {handleSnapPress, setModalPlaylist, modalTracks, setModalTracks} =
    useContext(ModalContext);
  const token = useSelector(state => state.user.token);

  const [playlist, setPlaylist] = useState([]);
  const [tracks, setTracks] = useState([]);

  const handleModal = async (track, playlist, tracks) => {
    await handleSnapPress(0);
    setModalPlaylist(playlist);
    setModalTracks(tracks);
    dispatch(saveModal(track));
    dispatch(saveType('track'));
  };

  useEffect(() => {
    if (modalTracks !== [] && modalTracks !== tracks) {
      setTracks(modalTracks);
    }
  }, [modalTracks]);

  useEffect(() => {
    const playlist_id = route.params.playlist;

    getPlaylist(token.access_token, playlist_id)
      .then(res => setPlaylist(res))
      .catch(error => console.log(error));

    getPlaylistTracks(token.access_token, playlist_id)
      .then(res => setTracks(res.items))
      .catch(error => console.log(error));
  }, [route.params.playlist]);

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
              onPress={() => handleModal(track, playlist, tracks, setTracks)}
            />
          </Touchable>
        ))}
    </PlaylistView>
  );
};

const PlaylistView = styled.ScrollView`
  background-color: ${({theme}) => theme.theme.background};
  flex: 1;
`;

const PlaylistHeader = styled.View`
  margin: 5px;
`;

const Owner = styled.View`
  flex-direction: row;
  align-items: center;
`;

const OwnerImage = styled.Image`
  border-radius: 50px;
  margin-right: 10px;
`;

const OwnerName = styled.Text`
  color: ${({theme}) => theme.theme.text};
  font-weight: bold;
  margin: 15px 0;
`;

const PlaylistImage = styled.Image`
  margin: 0 auto;
`;

const Touchable = styled.TouchableOpacity``;

export default Playlist;
