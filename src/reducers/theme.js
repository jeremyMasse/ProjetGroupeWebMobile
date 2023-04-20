// reducers/themeReducer.js
import {TOGGLE_THEME} from '../actions/themeAction';

const initialState = {
  isDarkMode: false,
  theme: {
    text: 'black',
    background: 'white',
  },
};

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
        theme: state.isDarkMode
          ? {text: 'black', background: 'white'}
          : {text: 'white', background: '#121212'},
      };
    default:
      return state;
  }
}
