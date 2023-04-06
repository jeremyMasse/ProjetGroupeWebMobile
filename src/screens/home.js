import React, {useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import styled from 'styled-components';
import {useInterstitialAd, TestIds} from 'react-native-google-mobile-ads';

const Home = ({navigation}) => {
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
      <Text>Playlist Generator</Text>
    </HomeView>
  );
};

const HomeView = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const StyledText = styled.Text`
  color: black;
`;

export default Home;
