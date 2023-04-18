import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';

const ActionRow = props => {
  return (
    <Touchable onPress={props.onPress}>
      <ActionView>
        <Icon name={props.icon} size={30} color="white" />
        <ActionText>{props.title}</ActionText>
      </ActionView>
    </Touchable>
  );
};

const ActionView = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

const ActionText = styled.Text`
  color: white;
  font-size: 16px;
  margin-left: 10px;
`;

const Touchable = styled.TouchableOpacity``;

export default ActionRow;
