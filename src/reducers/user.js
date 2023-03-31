import { SAVE_USER, SAVE_TOKEN } from "../actions/user";

const initialState = {
  token: null,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        user: action.payload
      };
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.payload
      }
    default:
      return state;
  }
}