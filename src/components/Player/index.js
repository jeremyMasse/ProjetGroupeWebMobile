import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../services/Track.service';
import TrackPlayer from 'react-native-track-player';
import {player} from '../../actions/player';
import Lottie from 'lottie-react-native';

const Player = () => {
  const isPlaying = useSelector(state => state.player.isPlaying);
  const track = useSelector(state => state.player.track);
  const [isFavorite, setIsFavorite] = useState(false);
  const token = useSelector(state => state.user.token);

  const dispatch = useDispatch();

  // const getFavorites = () => {
  //   axios('https://api.spotify.com/v1/me/tracks/contains').then(res => {
  //     setFavorites(res.data);
  //   });
  // };

  // const favorites = track => {
  //   axios('https://api.spotify.com/v1/me/tracks/contains');
  // };

  useEffect(() => {
    if (token) {
      const checkIsFavorite = async () => {
        try {
          const response = await axios.get(
            `https://api.spotify.com/v1/me/tracks/contains?ids=${track.id}`,
            {
              headers: {
                Authorization: `Bearer ${token.access_token}`,
              },
            },
          );
          setIsFavorite(response.data[0]);
        } catch (error) {
          console.log(error);
        }
      };
      checkIsFavorite();
    }
  }, [isFavorite, track, token]);

  return (
    <>
      {isPlaying ? (
        <PlayerView>
          <TrackImage
            source={{uri: track?.album?.images[0].url}}
            width={50}
            height={50}
          />
          <TrackView>
            <TrackTitle>{track?.name}</TrackTitle>
            <TrackArtist>{track?.artists[0].name}</TrackArtist>
          </TrackView>
          <PlayerButton>
            {isFavorite ? (
              <Touchable
                onPress={() => {
                  removeFromFavorites(track.id, token.access_token).then(() =>
                    setIsFavorite(false),
                  );
                }}>
                <Icon name="heart" size={25} color="#2ecc71" />
                <Lottie
                  source={require('./heart.json')}
                  autoPlay
                  loop={false}
                  width={50}
                  height={50}
                />
              </Touchable>
            ) : (
              <Touchable
                onPress={() =>
                  addToFavorites(track.id, token.access_token).then(() =>
                    setIsFavorite(true),
                  )
                }>
                <Icon name="heart-o" size={25} color="#fff" />
              </Touchable>
            )}
            <Touchable
              onPress={() => {
                TrackPlayer.reset();
                dispatch(player(false));
              }}>
              <Icon name="arrow-down" size={25} color="#fff" />
            </Touchable>
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
  color: ${({theme}) => theme.theme.text};
`;

const TrackArtist = styled.Text`
  color: #b2b2b2;
  font-size: 13px;
`;

const PlayerButton = styled.View`
  margin-left: auto;
  margin-right: 10px;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const Touchable = styled.TouchableOpacity``;

export default Player;
