// services/spotifyService.js
import axios from 'axios';
import base64 from 'react-native-base64';

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_BASE_URL = 'https://accounts.spotify.com';

export const requestAccessToken = async (
  code,
  clientID,
  clientSecret,
  redirectURI,
) => {
  try {
    const response = await axios.post(
      `${SPOTIFY_AUTH_BASE_URL}/api/token`,
      null,
      {
        params: {
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectURI,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${base64.encode(
            `${clientID}:${clientSecret}`,
          )}`,
        },
      },
    );

    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const fetchUserData = async accessToken => {
  try {
    const headers = {Authorization: `Bearer ${accessToken}`};
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/me`, {headers});

    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const searchSong = async (accessToken, song) => {
  const headers = {Authorization: `Bearer ${accessToken}`};
  const response = await axios.get('https://api.spotify.com/v1/search', {
    headers,
    params: {
      q: `${song.title.trim()}&artists=${song.artist.trim()}`,
      type: 'track',
      market: 'US',
      limit: 1,
    },
  });
  return response.data;
};

export const createPlaylist = async (accessToken, user, tempo) => {
  const headers = {Authorization: `Bearer ${accessToken}`};
  const response = await axios.post(
    `https://api.spotify.com/v1/users/${user.id}/playlists`,
    {
      // name: `Running Playlist (${tempo} BPM)`,
      name: tempo,
      description: 'A playlist generated by OpenAI for running',
      public: true,
    },
    {headers},
  );
  return response.data;
};

export const addToPlaylist = async (accessToken, playlistId, trackList) => {
  const headers = {Authorization: `Bearer ${accessToken}`};
  const response = await axios.post(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      uris: trackList,
    },
    {headers},
  );
  return response.data;
};
