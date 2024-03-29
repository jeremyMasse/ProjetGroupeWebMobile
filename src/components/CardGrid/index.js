import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components';

const CardGrid = props => {
  return (
    <GridView>
      <Touchable onPress={props.onPress}>
        <Image
          style={{width: '100%', height: 200}}
          source={{
            uri: props.img || 'https://robohash.org/?set=set4',
          }}
        />
        <GridTitle>{props.title}</GridTitle>
      </Touchable>
    </GridView>
  );
};

const GridView = styled.View`
  background-color: ${({theme}) => theme.theme.background};
  flex: 1 0 45%;
  margin: 5px;
`;

const GridTitle = styled.Text`
  color: ${({theme}) => theme.theme.text};
  text-align: center;
  margin: 5px 0;
`;

const Touchable = styled.TouchableOpacity``;

export default CardGrid;
