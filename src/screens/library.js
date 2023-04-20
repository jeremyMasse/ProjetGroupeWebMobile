import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ModalContext} from '../context/ModalContext';
import {useTranslation} from 'react-i18next';

//Redux
import {saveModal, saveType} from '../actions/modal';
import {useDispatch, useSelector} from 'react-redux';

//Components
import Title from '../components/Title';
import CardRow from '../components/CardRow';

const Library = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {handleSnapPress} = useContext(ModalContext);
  const {handleClosePress} = useContext(ModalContext);
  const {user} = useSelector(state => state.user);
  const token = useSelector(state => state.user.token);

  const [playlists, setPlaylists] = useState([]);

  const navigation = useNavigation();

  const handleModal = playlist => {
    handleClosePress();
    handleSnapPress(0);
    dispatch(saveModal(playlist));
    dispatch(saveType('playlist'));
  };

  useFocusEffect(() => {
    if (token) {
      axios
        .get(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
          params: {
            limit: 10,
            offset: 0,
            market: 'US',
          },
        })
        .then(playlist => {
          setPlaylists(playlist.data.items);
        })
        .catch(error => console.log(error.response));
    }
  });

  return (
    <LibraryView>
      <LibraryHeader>
        {user.images?.length > 0 && (
          <ProfilImage
            style={{width: 35, height: 35}}
            source={{
              uri: user.images[0].url,
            }}
          />
        )}

        <Title title={t('library.title')} />
        <AddIcon>
          <Icon name="add" color="white" size={35} />
        </AddIcon>
      </LibraryHeader>
      <LibraryMain>
        <ViewAdd>
          <ImageAdd>
            <Icon name="add" size={75} color="#b2b2b2" />
          </ImageAdd>
          <TextAdd>{t('library.addPlaylist')}</TextAdd>
        </ViewAdd>

        {playlists &&
          playlists.map(playlist => (
            <Touchable
              key={playlist.id}
              onPress={() =>
                navigation.navigate('Playlist', {playlist: playlist.id})
              }>
              <CardRow
                img={playlist.images[0] && playlist.images[0].url}
                title={playlist && playlist.name}
                width={75}
                height={75}
                artist={`Playlist - ${playlist.owner.display_name}`}
                hasActions={true}
                key={playlist.id}
                onPress={() => handleModal(playlist)}
              />
            </Touchable>
          ))}
      </LibraryMain>
    </LibraryView>
  );
};

const LibraryView = styled.ScrollView`
  background: #121212;
  flex: 1;
`;
const LibraryHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

const LibraryMain = styled.View``;

const ViewAdd = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ImageAdd = styled.View`
  background: #2e2e2e;
  width: 75px;
  height: 75px;
`;

const TextAdd = styled.Text`
  color: white;
  margin-left: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const ProfilImage = styled.Image`
  border-radius: 50px;
  margin-right: 10px;
`;

const AddIcon = styled.View`
  margin-left: auto;
`;
const TextTest = styled.Text`
  color: white;
`;
const Touchable = styled.TouchableOpacity``;

export default Library;
