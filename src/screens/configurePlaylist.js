import React, {useState} from 'react';
import styled from 'styled-components';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Title from '../components/Title';
import Icon from 'react-native-vector-icons/Feather';

const ConfigurePlaylist = ({route}) => {
  const {user} = useSelector(state => state.user);
  const navigation = useNavigation();
  const option = route.params.option;

  const [numberOfSongs, setNumberOfSongs] = useState(2);

  const [drivingStyle, setDrivingStyle] = useState('fast');

  const handleIncrement = () => {
    setNumberOfSongs(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    if (numberOfSongs > 1) {
      setNumberOfSongs(prevCount => prevCount - 1);
    }
  };

  return (
    <ConfigureView>
      <LibraryHeader>
        {user.images?.length > 0 && (
          <ProfilImage
            style={{width: 35, height: 35}}
            source={{
              uri: user.images[0].url,
            }}
          />
        )}

        <Title title="Generate a new playlist" />
      </LibraryHeader>
      <ConfigureMain>
        <ConfigureQuantity>
          <ConfigureTitle>
            How many songs do you want in your playlist?
          </ConfigureTitle>
          <QuantityInput>
            <TouchableQuantity onPress={handleDecrement}>
              <Icon name="minus" color="white" size={25} />
            </TouchableQuantity>
            <TextQuantity>{numberOfSongs} Songs</TextQuantity>
            <TouchableQuantity onPress={handleIncrement}>
              <Icon name="plus" color="white" size={25} />
            </TouchableQuantity>
          </QuantityInput>
        </ConfigureQuantity>
        {option === 'driving' && (
          <ConfigureDriving>
            <ConfigureTitle>What is your driving style ?</ConfigureTitle>
            <DrivingInput>
              <TouchableDriving
                onPress={() => setDrivingStyle('fast')}
                selected={drivingStyle === 'fast'}
                value="fast">
                <TextDriving>Fast & Furious</TextDriving>
              </TouchableDriving>
              <TouchableDriving
                onPress={() => setDrivingStyle('chill')}
                selected={drivingStyle === 'chill'}
                value="chill">
                <TextDriving>Chill & Vibe</TextDriving>
              </TouchableDriving>
            </DrivingInput>
          </ConfigureDriving>
        )}
      </ConfigureMain>
      <ConfigureBottom>
        <TouchablePrevious
          onPress={() => navigation.navigate('PlaylistGenerator')}>
          <TextPrevious>Previous</TextPrevious>
        </TouchablePrevious>
        <TouchableGenerate
          onPress={() =>
            navigation.navigate('GeneratePlaylist2', {
              option: option,
              numberOfSongs: numberOfSongs,
              drivingStyle: drivingStyle,
            })
          }>
          <TextGenerate>Generate</TextGenerate>
        </TouchableGenerate>
      </ConfigureBottom>
    </ConfigureView>
  );
};

const ConfigureView = styled.View`
  flex: 1;
  background: #121212;
`;

const LibraryHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: black;
`;

const ProfilImage = styled.Image`
  border-radius: 50px;
  margin-right: 10px;
`;

const ConfigureMain = styled.View``;

const ConfigureQuantity = styled.View`
  margin: 0 auto;
`;

const ConfigureDriving = styled.View`
  margin: 0 auto;
`;

const ConfigureTitle = styled.Text`
  font-size: 16px;
  color: #2ecc71;
  text-align: center;
  margin: 10px 0;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const QuantityInput = styled.View`
  flex-direction: row;
  display: flex;
  justify-content: center;
  gap: 10px;
  height: 30px;
  margin-bottom: 10px;
`;

const TextQuantity = styled.Text`
  color: white;
  border: 1px solid white;
  height: 100%;
  padding: 5px 10px;
  font-weight: bold;
  border-radius: 5px;
`;

const TouchableQuantity = styled.TouchableOpacity`
  border: 1px solid white;
  height: 100%;
  flex-direction: row;
  align-items: center;
  padding: 0 5px;
  border-radius: 5px;
`;

const DrivingInput = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: center;
`;

const TouchableDriving = styled.TouchableOpacity`
  border: 1px solid white;
  flex-direction: row;
  align-items: center;
  padding: 5px 15px;
  border-radius: 15px;
  background-color: ${({selected}) => (selected ? '#2ecc71' : 'transparent')};
`;

const TextDriving = styled.Text`
  color: white;
  font-weight: bold;
`;

const ConfigureBottom = styled.View`
  flex-direction: row;
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 100%;
  gap: 25px;
  justify-content: center;
`;

const TouchablePrevious = styled.TouchableOpacity`
  border: 2px solid white;
  padding: 10px 30px;
  border-radius: 25px;
`;

const TouchableGenerate = styled.TouchableOpacity`
  border: 2px solid #2ecc71;
  padding: 10px 30px;
  border-radius: 25px;
`;

const TextPrevious = styled.Text`
  color: white;
  text-transform: uppercase;
  font-weight: bold;
`;

const TextGenerate = styled.Text`
  color: #2ecc71;
  text-transform: uppercase;
  font-weight: bold;
`;

export default ConfigurePlaylist;