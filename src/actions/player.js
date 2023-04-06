export const PLAYER = 'PLAYER';
export const SAVE_TRACK = 'SAVE_TRACK';

export const player = payload => ({
  type: PLAYER,
  payload: payload,
});

export const saveTrack = payload => ({
  type: SAVE_TRACK,
  payload: payload,
});
