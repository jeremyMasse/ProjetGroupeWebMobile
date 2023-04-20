import {ActivityIndicator, Text, View, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Profile from '../components/ProfilUser';
import LottieView from 'lottie-react-native';
import GirlListenMusic from '../assets/81966-girl-listening-to-music.json';
import styled from 'styled-components/native';

const SpotifyProfile = () => {
  const {user} = useSelector(state => state.user);
  return (
    <>
      {Object.keys(user).length !== 0 ? (
        <ProfileContainer>
          <Profile user={user} />
        </ProfileContainer>
      ) : (
        <LoadingContainer>
          <LottieView source={GirlListenMusic} autoPlay loop />
          <LoadingIndicator />
        </LoadingContainer>
      )}
    </>
  );
};

const ProfileContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.theme.background};
`;

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.theme.background};
`;

const LoadingIndicator = styled(ActivityIndicator)`
  margin-top: 20px;
`;

export default SpotifyProfile;
