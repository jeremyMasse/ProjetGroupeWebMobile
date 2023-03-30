import React, {useContext} from 'react';
import {View, FlatList} from 'react-native';
import {FavoritesContext} from '../contexts/FavoritesContext';
// import globalStyledComponents from '../styles/globalStyledComponents'

/**
 * Ce composant permet d'afficher la liste des exercices mit en favoris, avec un bouton pour la suppression des exercices des favoris
 */
const Favorites = () => {
  const {favorites, removeFavorite} = useContext(FavoritesContext);

  // const renderItem = ({item}) => (
    // <ExerciceItem exercice={item}>
    //   <globalStyledComponents.RemoveFromFavoritesButton onPress={() => removeFavorite(item.id)}>
    //     <globalStyledComponents.RemoveFromFavoritesText>Supprimer des favoris</globalStyledComponents.RemoveFromFavoritesText>
    //   </globalStyledComponents.RemoveFromFavoritesButton>
    // </ExerciceItem>
  // );

  return (
    <View>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Favorites;
