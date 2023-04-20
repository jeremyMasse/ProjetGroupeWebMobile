// reducers/themeReducer.js
import {TOGGLE_THEME} from '../actions/themeAction';
import {theme} from '../config/themes';

const initialState = {
  isDarkMode: false,
  theme: {
    text: theme.lightTextColor,
    background: theme.lightBackgroundColor,
  },
};

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
        theme: state.isDarkMode
          ? {text: theme.lightTextColor, background: theme.lightBackgroundColor}
          : {text: theme.darkTextColor, background: theme.darkBackgroundColor},
      };
    default:
      return state;
  }
}
