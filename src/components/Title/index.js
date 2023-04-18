import React from 'react';
import styled from 'styled-components';

const Title = ({title}) => {
  return <TitleText>{title}</TitleText>;
};

const TitleText = styled.Text`
  font-size: 20px;
  color: white;
  font-weight: bold;
`;

export default Title;
