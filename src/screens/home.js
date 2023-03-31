import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components';
import Counter from "../components/Counter";


const Home = () => {


    return (
        <View>
            <Text>Playlist Generator</Text>
            <Counter />
        </View>
    )
}


export default Home;