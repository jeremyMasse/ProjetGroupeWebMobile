import React from 'react';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Title from '../components/Title';
import CardGrid from '../components/CardGrid';
import {useTranslation} from 'react-i18next';
import LottieView from 'lottie-react-native';
import GirlListenMusic from '../assets/81966-girl-listening-to-music.json';
import {handlePlay} from '../services/Player.service';
import {player, saveTrack} from '../actions/player';
import {err} from 'react-native-svg/lib/typescript/xml';

const PlaylistGenerator = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const {user} = useSelector(state => state.user);

  return (
    <GeneratorView>
      <LibraryHeader>
        {user.images?.length > 0 && (
          <ProfilImage
            style={{width: 35, height: 35}}
            source={{
              uri: user.images[0].url,
            }}
          />
        )}

        <Title title={t('library.addPlaylist')} />
      </LibraryHeader>

      <GridView>
        <CardGrid
          title={t('generator.playlistBpm')}
          img="https://i.pinimg.com/564x/30/a4/02/30a402aa2d756f11d250b90bd11bf1d4.jpg"
          onPress={() =>
            navigation.navigate('ConfigurePlaylist', {option: 'bpm'})
          }
        />
        <CardGrid
          title={t('generator.playlistDriving')}
          img="https://i.pinimg.com/564x/a5/f1/78/a5f17886697760a0b591ee396d2ce317.jpg"
          onPress={() =>
            navigation.navigate('ConfigurePlaylist', {option: 'driving'})
          }
        />
        <CardGrid
          title={t('generator.playlistWeather')}
          img="https://i.pinimg.com/564x/0b/c9/b7/0bc9b785836ce450a75fcd4f82a6644f.jpg"
          onPress={() =>
            navigation.navigate('ConfigurePlaylist', {option: 'weather'})
          }
        />
        <CardGrid
          title={t('generator.playlistMood')}
          img="https://i.pinimg.com/564x/95/7f/cf/957fcfc0aed065f8e2eff9103bf1f8ef.jpg"
          onPress={() =>
            navigation.navigate('ConfigurePlaylist', {option: 'mood'})
          }
        />
      </GridView>
    </GeneratorView>
  );
};

const GeneratorView = styled.View`
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

const GridView = styled.View`
  width: 100%;
  margin-top: 5px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default PlaylistGenerator;
