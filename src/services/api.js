/**
 * Dossier contenant Les requêtes vers l'api de musculation
 */
import axios from 'axios';
const languageId = 12; // French language ID
const APIKey = 'c520915d4996f75b2bf2dfbec0085e45920b7c9e'; //clé pour accéder à certaines routes de l'api
const api = axios.create({
  baseURL: 'https://wger.de/api/v2',
});

/**
 *  Cette fonction permet de récupérer tous les exercices d'un langage choisi (ici le français)
 *
 * @returns Array contenant les exercices
 */
exports.getExercises = async () => {
  try {
    const response = await api.get(`/exercise/?language=${languageId}`, {
      headers: {
        Authorization: `Token ${APIKey}`,
      },
    });

    if (!response.data.results) {
      console.log('Aucun exercice trouvé pour le langage:', languageId);
      return [];
    }

    return response.data.results;
  } catch (error) {
    console.log('Erreur lors de la récupération des exercices:', error);
    return error;
  }
};

/**
 *  Cette fonction permet de récupérer l'image d'un exercice
 *
 * @returns String contenant le lien de l'image
 */
exports.getImageOfExercise = async idExercice => {
  try {
    const response = await api.get('/exerciseimage', {
      headers: {
        Authorization: `Token ${APIKey}`,
      },
      params: {
        exercise_base: idExercice,
      },
    });

    if (response.data.results.length === 0) {
      console.log('Aucun résultat trouvé pour idExercice:', idExercice);
      return null;
    }

    return response.data.results[0].image;
  } catch (error) {
    console.log('Erreur lors de la récupération de l\'image de l\'exercice:', error);
    return error;
  }
};

