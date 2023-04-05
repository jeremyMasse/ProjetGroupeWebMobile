import { PLAYER, SAVE_TRACK } from "../actions/player";

const initialState = {
  isPlaying: false,
  track:{},
};


export default (state = initialState, action) => {
  switch (action.type) {
    case PLAYER:
      return {
        ...state,
        isPlaying: action.payload
      };
    case SAVE_TRACK:
      return {
        ...state,
        track: action.payload
      };
    default:
      return state;
  }
};
