import React, {useState} from 'react';
import styled from 'styled-components';

/**
 * Ce composant permet d'afficher une barre de recherche en haut de l'application
 */
const ExerciseSearchBar = ({onSearch}) => {
  const [search, setSearch] = useState('');

  // A chaque nouveau caractère dans la barre, cette fonction est lancé pour faire une recherche dans les exeercices
  const handleSearch = search => {
    setSearch(search);
    onSearch(search);
  };

  return (
    <SearchBarContainer>
      <SearchInput
        onChangeText={handleSearch}
        placeholder="Rechercher un exercice..."
      />
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.View`
  background-color: #ffffff;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const SearchInput = styled.TextInput`
  height: 40px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 4px;
  padding: 5px;
`;


export default ExerciseSearchBar;
