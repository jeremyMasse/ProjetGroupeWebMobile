import React, {useState} from 'react';
import styled from 'styled-components/native';
import {View, Image, Text, Switch} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';
import {Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Profil = ({user}) => {
  const {country, display_name, email, images, followers, product} = user;
  const {t, i18n} = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = value => {
    setDarkMode(value);
  };

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <ProfileContainer>
      <Avatar
        source={{
          uri: images[0]?.url || `https://robohash.org/${user.id}?set=set4`,
        }}
      />
      <InfoContainer>
        <DisplayName>{display_name}</DisplayName>
        <Email>{email}</Email>
        <Country>
          {t('profil.country')}: {country}
        </Country>
        <Followers>
          {t('profil.followers')}: {followers.total}
        </Followers>
        <Subscription>
          {t('profil.subscription')}: {product}
        </Subscription>
      </InfoContainer>
      <PreferencesContainer>
        <Onglet>
          <Title>
            <MaterialIcons
              name="language"
              size={30}
              color="white"
              // style={{position: ''}}
            />
            <TitleText>{t('profil.language')}</TitleText>
          </Title>
          <LanguagePicker
            selectedValue={language}
            onValueChange={(itemValue, itemIndex) => changeLanguage(itemValue)}>
            <Picker.Item label={t('profil.english')} value="en" />
            <Picker.Item label={t('profil.french')} value="fr" />
          </LanguagePicker>
        </Onglet>
        <Onglet>
          <Title>
            <FontAwesome name="moon-o" size={30} color="white" />
            <TitleText>{t('profil.darkMode')}</TitleText>
          </Title>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={darkMode ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDarkMode}
            value={darkMode}
          />
        </Onglet>
      </PreferencesContainer>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.View`
  flex: 1;
  background-color: #121212;
  align-items: center;
  padding: 20px;
`;

const InfoContainer = styled.View`
  align-items: center;
  background-color: #121212;
`;

const DisplayName = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
`;

const Email = styled.Text`
  font-size: 18px;
  color: white;
  margin-bottom: 20px;
`;

const Country = styled.Text`
  font-size: 18px;
  color: white;
  margin-bottom: 10px;
`;

const Followers = styled.Text`
  font-size: 18px;
  color: white;
  margin-bottom: 10px;
`;

const Subscription = styled.Text`
  font-size: 18px;
  color: white;
  margin-bottom: 10px;
`;

const Avatar = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  margin-bottom: 20px;
`;

const screenWidth = Dimensions.get('window').width;

const PreferencesContainer = styled.View`
  flex: 1;
  background-color: black;
  margin-top: 20px;
  color: white;
  width: ${screenWidth}px;
`;

const Onglet = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  background-color: #121212;
  padding: 0 20px;
  margin-top: 10px;
  height: 50px;
`;

const Title = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-left: 10px;
`;

const LanguagePicker = styled(Picker)`
  width: 150px;
  height: 40px;
  color: white;
`;

export default Profil;
