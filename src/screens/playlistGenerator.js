import React from 'react';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Title from '../components/Title';
import CardGrid from '../components/CardGrid';

const PlaylistGenerator = () => {
  const navigation = useNavigation();

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

        <Title title="Generate a new playlist" />
      </LibraryHeader>

      <GridView>
        <CardGrid
          title="Find a new playlist that matches your bpm "
          img="https://i.pinimg.com/564x/30/a4/02/30a402aa2d756f11d250b90bd11bf1d4.jpg"
          onPress={() =>
            navigation.navigate('ConfigurePlaylist', {option: 'bpm'})
          }
        />
        <CardGrid
          title="Find a new playlist a new playlist for you driving"
          img="https://i.pinimg.com/564x/a5/f1/78/a5f17886697760a0b591ee396d2ce317.jpg"
          onPress={() =>
            navigation.navigate('ConfigurePlaylist', {option: 'driving'})
          }
        />
        <CardGrid
          title="Find a new playlist a new playlist that matches your mood"
          onPress={() =>
            navigation.navigate('ConfigurePlaylist', {option: 'weather'})
          }
        />
        <CardGrid
          title="Based on your mood"
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

const GridView = styled.View`
  width: 100%;
  margin-top: 5px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export default PlaylistGenerator;
