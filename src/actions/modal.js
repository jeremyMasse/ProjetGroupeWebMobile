export const SAVE_MODAL = 'SAVE_MODAL';
export const SAVE_TYPE = 'SAVE_TYPE';

export const saveModal = payload => ({
  type: SAVE_MODAL,
  payload: payload,
});

export const saveType = payload => ({
  type: SAVE_TYPE,
  payload: payload,
});
