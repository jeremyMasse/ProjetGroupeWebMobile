import React, {createContext, useState, useContext} from 'react';
import { ToasterContext } from './ToasterContext';

export const FavoritesContext = createContext();

/**
 * Ce context permet de garder dans toute l'application les favoris de l'utilisateur
 */
export const FavoritesProvider = ({children}) => {
  const [favorites, setFavorites] = useState([]);
  const { addMessage } = useContext(ToasterContext);

  /**
   * Permet d'ajouter un exercice en favoris si il n'est pas déjà dans la liste et envoie un message à l'utilisateur.
   */
  const addFavorite = exercise => {
    if (!isAlreadyInFavorites(exercise)) {
      setFavorites([...favorites, exercise]);
      addMessage(`L'exercice "${ exercise.name }" a été ajouté aux favoris`, 'success');
    } else {
      addMessage(`L'exercice "${ exercise.name }" est déjà dans les favoris`, 'error');
    }
  };

  /**
   * Permet de supprimer un exercice dese favoris envoie un message à l'utilisateur.
   */
  const removeFavorite = exerciseId => {
    setFavorites(favorites.filter(fav => fav.id !== exerciseId));
    addMessage(`Exercice supprimé des favoris`, 'success');
  };

  /**
   * Permet de voir si un exercice est dans les favoris.
   */
  const isAlreadyInFavorites = exercise => {
    return favorites.some(fav => fav.id === exercise.id);
  }
  return (
    <FavoritesContext.Provider value={{favorites, addFavorite, removeFavorite, isAlreadyInFavorites}}>
      {children}
    </FavoritesContext.Provider>
  );
};
