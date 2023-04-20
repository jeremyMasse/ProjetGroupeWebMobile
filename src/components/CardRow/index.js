import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Entypo';

const CardRow = props => {
  return (
    <CardContainer>
      <CardImage
        style={{width: props.width, height: props.height}}
        source={{
          uri: props.img,
        }}
      />
      <CardInfo>
        <Title>{props.title}</Title>
        <Artist>{props.artist}</Artist>
      </CardInfo>
      {props.hasActions && (
        <CardActions>
          <Icon
            name="dots-three-vertical"
            size={20}
            color="white"
            onPress={props.onPress}
          />
        </CardActions>
      )}
    </CardContainer>
  );
};

const CardContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CardImage = styled.Image``;

const CardInfo = styled.View`
  margin-left: 10px;
`;

const CardActions = styled.View`
  margin-left: auto;
`;

const Artist = styled.Text`
  color: #b2b2b2;
`;

const Title = styled.Text`
  color: white;
  font-size: 16px;
`;

export default CardRow;
