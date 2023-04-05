import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Home = () => {



    return (
        <View>
            <Text>Playlist Generator</Text>
            
        </View>
    )
}

const HomeView = styled.View`
    background: #191414;
    flex: 1;
`

export default Home;
