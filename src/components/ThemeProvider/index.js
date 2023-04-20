import React from 'react';
import {useSelector} from 'react-redux';
import {ThemeProvider as StyledThemeProvider} from 'styled-components/native';
import {lightTheme, darkTheme} from '../../config/themes';

const ThemeProvider = ({children}) => {
  const darkMode = useSelector(state => state.darkMode);

  return (
    <StyledThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
