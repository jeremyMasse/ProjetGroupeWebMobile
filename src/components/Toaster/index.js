import React, { useContext, useEffect } from 'react';
import styled, { css } from 'styled-components/native';
import { ToasterContext } from '../../contexts/ToasterContext';

/**
 * Ce composant permet d'afficher des messages pour l'utilisateur en bas de l'écran
 */
const Toaster = () => {
  const { messageData, removeMessage } = useContext(ToasterContext);

  useEffect(() => {
    if (messageData) {
      // Supprime le message après 3 secondes
      const timer = setTimeout(() => {
        removeMessage();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [messageData, removeMessage]);

  if (!messageData) {
    return null;
  }

  return (
    <ToasterContainer type={messageData.type}>
      <ToasterText>{messageData.value}</ToasterText>
    </ToasterContainer>
  );
};

// Le type permets de choisir la couleur, rouge quand c'est une erreur, vert quand c'est un success
const ToasterContainer = styled.View`
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
  z-index: 1000;

  ${({ type }) =>
    type === 'success'
      ? css`
          background-color: #4caf50;
        `
      : css`
          background-color: #f44336;
        `}
`;

const ToasterText = styled.Text`
  color: white;
  font-size: 16px;
`;

export default Toaster;
