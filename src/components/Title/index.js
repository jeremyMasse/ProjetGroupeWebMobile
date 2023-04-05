import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/AntDesign';

const Title = ({title}) => {
    return (
        <TitleText>{title}</TitleText>
    )
}

const TitleText = styled.Text`
    font-size: 20px;
    color: white;
    font-weight: bold;
`



export default Title;