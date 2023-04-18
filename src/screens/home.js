import React, {useEffect, useContext} from 'react';
import {Button} from 'react-native';
import styled from 'styled-components';
import {useInterstitialAd, TestIds} from 'react-native-google-mobile-ads';
import {ModalContext} from '../context/ModalContext';
const Home = ({navigation}) => {
  const {handleSnapPress} = useContext(ModalContext);

  const {isLoaded, isClosed, load, show} = useInterstitialAd(
    TestIds.INTERSTITIAL,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );
  useEffect(() => {
    // Start loading the interstitial straight away
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      // Action after the ad is closed
      navigation.navigate('Spotify Login');
    }
  }, [isClosed, navigation]);

  useEffect(() => {
    if (isLoaded === true) {
      show();
    }
  }, [isLoaded]);
  return (
    <HomeView>
      <StyledText>Playlist Generator</StyledText>
      <Button title="Open Modal" onPress={() => handleSnapPress(0)} />
    </HomeView>
  );
};

const HomeView = styled.View`
  flex: 1;
  background-color: #red;
`;

const StyledText = styled.Text`
  color: black;
`;

export default Home;
