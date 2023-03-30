import React, {createContext, useState} from 'react';

/**
 * Ce context permet de gérer dans toute l'application, l'affichage de message pour l'utilisateur
 */
export const ToasterProvider = ({children}) => {
  const [messageData, setMessageData] = useState(null);

  /**
   * Permet d'ajouter un message qui sera en success(vert) ou en error(rouge) selon le type.
   */
  const addMessage = (value, type) => {
    setMessageData({ value, type });
  };

  /**
   * Permet de supprimer un message
   */
  const removeMessage = () => {
    setMessageData(null);
  };

  return (
    <ToasterContext.Provider value={{messageData, addMessage, removeMessage}}>
      {children}
    </ToasterContext.Provider>
  );
};

export const ToasterContext = createContext();
