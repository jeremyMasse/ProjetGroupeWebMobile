import {TOGGLE_THEME} from '../actions/themeAction';
import {lightTheme, darkTheme} from '../config/themes';

const initialState = lightTheme;

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return state === lightTheme ? darkTheme : lightTheme;
    default:
      return state;
  }
};

export default themeReducer;
