export const SAVE_USER = 'SAVE_USER';
export const SAVE_TOKEN = 'SAVE_TOKEN';

export const saveUser = payload => ({
  type: SAVE_USER,
  payload: payload,
});

export const saveToken = payload => ({
  type: SAVE_TOKEN,
  payload: payload,
});
