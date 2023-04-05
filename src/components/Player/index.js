import React, { useCallback, useRef, useMemo } from "react";
import { StyleSheet, View, Text, Button, Image } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {player} from '../actions/player';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';

const Player = () => {

  const dispatch = useDispatch();

  const isPlaying = useSelector((state) => state.player.isPlaying);

  const track = useSelector(state => state.player.track);

  return (
    <>
      {isPlaying ?  (
        <PlayerView>
          <TrackImage 
          source={{uri: track.track.album.images[0].url}}
          width={50}
          height={50}
          />
          <TrackTitle>{track.track.name}</TrackTitle>
        </PlayerView>
      ) : ("")}
    </>
  );
};


const PlayerView = styled.View`
  position: absolute;
  bottom: 55px;
  background: #121212;
  width: 100%;
`

const TrackImage = styled.Image``;

const TrackTitle = styled.Text`
  color: #fff;
`

const TrackArtist = styled.Text`
  color: #fff;
`

export default Player;
