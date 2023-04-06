import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Modal, Pressable} from 'react-native';
import styled from 'styled-components';
import CardRow from '../CardRow';
import ActionRow from '../ActionRow';
import Icon from 'react-native-vector-icons/Entypo';

const ModalActions = props => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.handleModal}>
      <Touchable onPress={props.handleModal} />
      <ModalContainer>
        <ModalHeader>
          <CardRow
            fromModal={true}
            title={props.title}
            artist={props.artist}
            img={props.img}
            width={50}
            height={50}
          />
        </ModalHeader>
        <ModalBody>{props.children}</ModalBody>
      </ModalContainer>
    </Modal>
  );
};

const Touchable = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  position: absolute;
  width: 100%;
`;

const ModalContainer = styled.View`
  height: 65%;
  width: 100%;
  background: #121212;
  position: absolute;
  bottom: 0;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const ModalHeader = styled.View`
  border-bottom-width: 0.25px;
  border-bottom-color: white;
  padding: 15px 5px;
`;
const ModalBody = styled.View`
  padding: 15px 5px;
`;

export default ModalActions;
