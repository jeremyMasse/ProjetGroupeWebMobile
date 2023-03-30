import React from 'react';
import Routes from './src/routes';
import {FavoritesProvider} from './src/contexts/FavoritesContext';
import {ToasterProvider} from './src/contexts/ToasterContext';
import Toaster from './src/components/Toaster';
// import { Provider } from 'react-redux';

/**
 * Point de départ de l'application, nous avons ici l'import du router et des proviers ainsi que le composant global toaster
 */
const App = () => {
  return (
    <ToasterProvider>
      <FavoritesProvider>
        <Toaster/>
        <Routes />
      </FavoritesProvider>
    </ToasterProvider>
  );
};

export default App;
