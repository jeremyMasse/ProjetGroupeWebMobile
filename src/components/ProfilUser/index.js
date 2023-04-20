import React, {useState} from 'react';
import styled from 'styled-components/native';
import {View, Image, Text, Switch, Touchable} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {toggleTheme} from '../../actions/themeAction';
import {Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {logout} from '../../actions/user';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const Profil = ({user}) => {
  const {country, display_name, email, images, followers, product} = user;
  const {t, i18n} = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  console.log(themeGlobal);
  const handleLogout = () => {
    dispatch(logout());
  };
  const toggleDarkMode = () => {
    dispatch(toggleTheme());
  };

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <ProfileContainer theme={theme.theme}>
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
            <MaterialIcons name="language" size={24} color={theme.text} />
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
            <FontAwesome name="moon-o" size={24} color={theme.text} />
            <TitleText>{t('profil.darkMode')}</TitleText>
          </Title>
          <Switch
            trackColor={{false: '#767577', true: '#169C4A'}}
            thumbColor={isDarkMode ? '#4ECC75' : '#f4f3f4'}
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </Onglet>
        <Button onPress={() => navigation.navigate('Favorites')}>
          <Title>
            <FontAwesome name="heart" size={24} color={theme.text} />
            <TitleText>{t('profil.favorites')}</TitleText>
          </Title>
        </Button>
        <Button onPress={handleLogout}>
          <Title>
            <FontAwesome name="sign-out" size={24} color={theme.text} />
            <TitleText>{t('profil.disconnect')}</TitleText>
          </Title>
        </Button>
      </PreferencesContainer>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.View`
  flex: 1;
  background: ${({theme}) => {
    console.log(theme);
    return theme.theme.background;
  }};
  align-items: center;
  padding: 20px;
`;

const InfoContainer = styled.View`
  align-items: center;
  background-color: ${({theme}) => theme.theme.background};
`;

const DisplayName = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: ${({theme}) => theme.theme.text};
  margin-bottom: 10px;
`;

const Email = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.theme.text};
  margin-bottom: 20px;
`;

const Country = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.theme.text};
  margin-bottom: 10px;
`;

const Followers = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.theme.text};
  margin-bottom: 10px;
`;

const Subscription = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.theme.text};
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
  background-color: lightgrey;
  margin-top: 20px;
  width: ${screenWidth}px;
  padding-bottom: 2px;
`;

const Onglet = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme}) => theme.theme.background};
  padding: 0 20px;
  margin-top: 2px;
  height: 50px;
`;

const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme}) => theme.theme.background};
  padding: 0 20px;
  margin-top: 2px;
  height: 50px;
`;

const Title = styled.View`
  flex-direction: row;
  align-items: center;
  color: ${({theme}) => theme.theme.text};
`;

const TitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.theme.text};
  margin-left: 10px;
`;

const LanguagePicker = styled(Picker)`
  width: 150px;
  height: 40px;
  color: ${({theme}) => theme.theme.text};
`;

export default Profil;
