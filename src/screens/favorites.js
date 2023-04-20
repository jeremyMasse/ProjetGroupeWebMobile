import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {getFavorites} from '../services/Track.service';
import CardRow from '../components/CardRow';
import Title from '../components/Title';
const Favorites = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);

  const token = useSelector(state => state.user.token);
  const {user} = useSelector(state => state.user);
  useEffect(() => {
    getFavorites(token.access_token)
      .then(res => setFavorites(res))
      .catch(err => console.log(err));
  }, []);

  return (
    <FavoritesView>
      <FavoritesHeader>
        {user.images?.length > 0 && (
          <ProfilImage
            style={{width: 35, height: 35}}
            source={{
              uri: user.images[0].url,
            }}
          />
        )}

        <Title title="Your Favorites" />
      </FavoritesHeader>

      {favorites.map(favorite => (
        <CardRow
          key={favorite.track.id}
          title={favorite.track.name}
          artist={favorite.track.artists.map(artist => `${artist.name}, `)}
          img={favorite.track.album.images[0].url}
          width={50}
          height={50}
        />
      ))}
    </FavoritesView>
  );
};

const FavoritesView = styled.ScrollView`
  flex: 1;
  background: ${({theme}) => {
    console.log(theme);
    return theme.theme.background;
  }};
`;

const FavoritesHeader = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: black;
  margin-bottom: 10px;
`;

const ProfilImage = styled.Image`
  border-radius: 50px;
  margin-right: 10px;
`;

export default Favorites;
