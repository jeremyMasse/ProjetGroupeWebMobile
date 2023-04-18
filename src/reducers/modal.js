import {SAVE_MODAL, SAVE_TYPE} from '../actions/modal';

const initialState = {
  modal: {},
  type: 'track',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case SAVE_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    default:
      return state;
  }
};
