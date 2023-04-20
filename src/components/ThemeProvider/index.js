import React from 'react';
import {ThemeProvider as StyledThemeProvider} from 'styled-components/native';
import {theme} from '../../config/themes';

const ThemeProvider = ({children}) => {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};

export default ThemeProvider;
