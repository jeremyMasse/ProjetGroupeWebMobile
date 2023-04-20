export const SAVE_USER = 'SAVE_USER';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const LOGOUT = 'LOGOUT';

export const saveUser = payload => ({
  type: SAVE_USER,
  payload: payload,
});

export const saveToken = payload => ({
  type: SAVE_TOKEN,
  payload: payload,
});

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
