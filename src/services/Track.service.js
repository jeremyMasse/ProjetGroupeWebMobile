import axios from 'axios';
import Toast from 'react-native-toast-message';
import TrackPlayer from 'react-native-track-player';

export const addToFavorites = async (trackId, token) => {
  await axios
    .put(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      Toast.show({
        type: 'success',
        text1: 'Added to favorites',
      });
    })

    .catch(error => {
      console.log(error);
    });
};

export const removeFromFavorites = async (trackId, token) => {
  await axios
    .delete(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      Toast.show({
        type: 'error',
        text1: 'Removed from favorites',
      });
    })

    .catch(error => {
      console.log(error);
    });
};

export const getFavorites = async token => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/tracks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const trackItems = response.data.items;

    return trackItems;
  } catch (error) {
    console.error(error);
  }
};
