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
        Authorization: `Basic ${base64.encode(`${clientID}:${clientSecret}`)}`,
      },
    },
  );

  return response.data;
};

export const fetchUserData = async accessToken => {
  const headers = {Authorization: `Bearer ${accessToken}`};
  const response = await axios.get(`${SPOTIFY_API_BASE_URL}/me`, {headers});
  return response.data;
};
