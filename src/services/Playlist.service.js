// services/spotifyService.js
import axios from 'axios';
import base64 from 'react-native-base64';
import Toast from 'react-native-toast-message';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_BASE_URL = 'https://accounts.spotify.com';

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
  setTracks,
) => {
  const headers = {Authorization: `Bearer ${access_token}`};
  axios({
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

      // Update Tracks avec suppression de la track
      setTracks(prevTracks =>
        prevTracks.filter(track => track.track.uri !== track_uri),
      );
    })
    .catch(error => {
      Toast.show({
        type: 'error',
        text1: 'An error occured',
      });
    });
};
