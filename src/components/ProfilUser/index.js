import React from 'react';
import styled from 'styled-components/native';
import {View, Image, Text} from 'react-native';

const Profil = ({user}) => {
  const {display_name, email, photoUrl, bio} = user;
  console.log('ruejk', display_name);
  return (
    <ProfileContainer>
      {/* <Avatar source={{uri: photoUrl}} /> */}
      <InfoContainer>
        <DisplayName>{user.display_name}</DisplayName>
        <Email>{user.email}</Email>
        <Bio>{bio}</Bio>
      </InfoContainer>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.View`
  flex: 1;
  background-color: #f8f8f8;
  align-items: center;
  padding: 20px;
`;

const Avatar = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-bottom: 20px;
`;

const InfoContainer = styled.View`
  align-items: center;
`;

const DisplayName = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const Email = styled.Text`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
`;

const Bio = styled.Text`
  font-size: 16px;
  color: #333;
  text-align: center;
`;

export default Profil;
