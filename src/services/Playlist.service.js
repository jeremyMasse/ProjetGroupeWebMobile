// services/spotifyService.js
import axios from 'axios';
import Toast from 'react-native-toast-message';

export const getPlaylist = async (access_token, playlist_id) => {
  const headers = {Authorization: `Bearer ${access_token}`};
  const response = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlist_id}`,
    {
      headers,
      params: {
        limit: 0,
        offset: 0,
        market: 'US',
      },
    },
  );
  return response.data;
};

export const getPlaylistTracks = async (access_token, playlist_id) => {
  const headers = {Authorization: `Bearer ${access_token}`};
  const response = await axios.get(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
    {
      headers,
      params: {
        limit: 10,
        offset: 0,
        market: 'US',
      },
    },
  );
  return response.data;
};

export const deleteTrackFromPlaylist = (
  access_token,
  playlist_id,
  track_uri,
  track_name,
  playlist_name,
) => {
  const headers = {Authorization: `Bearer ${access_token}`};
  return axios({
    method: 'delete',
    url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
    headers,
    data: {
      tracks: [
        {
          uri: track_uri,
        },
      ],
    },
  })
    .then(response => {
      Toast.show({
        type: 'success',
        text1: `${track_name}`,
        text2: `has been removed from ${playlist_name}`,
      });
      return response.data;
    })
    .catch(error => {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'An error occured',
      });
      throw error; // Vous pouvez propager l'erreur pour la gérer à l'extérieur de la fonction
    });
};
