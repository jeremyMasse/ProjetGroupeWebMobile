import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';

const Player = () => {
  const isPlaying = useSelector(state => state.player.isPlaying);

  const track = useSelector(state => state.player.track);

  return (
    <>
      {isPlaying ? (
        <PlayerView>
          <TrackImage
            source={{uri: track.track.album.images[0].url}}
            width={50}
            height={50}
          />
          <TrackView>
            <TrackTitle>{track.track.name}</TrackTitle>
            <TrackArtist>{track.track.artists[0].name}</TrackArtist>
          </TrackView>
          <PlayerButton>
            <Icon name="play" size={25} color="#fff" />
          </PlayerButton>
        </PlayerView>
      ) : (
        ''
      )}
    </>
  );
};

const PlayerView = styled.View`
  position: absolute;
  bottom: 55px;
  background: #292828;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 5px;
`;

const TrackImage = styled.Image``;

const TrackView = styled.View`
  flex-direction: column;
  margin-left: 10px;
`;

const TrackTitle = styled.Text`
  color: #fff;
`;

const TrackArtist = styled.Text`
  color: #b2b2b2;
  font-size: 13px;
`;

const PlayerButton = styled.View`
  margin-left: auto;
  margin-right: 20px;
`;

export default Player;
