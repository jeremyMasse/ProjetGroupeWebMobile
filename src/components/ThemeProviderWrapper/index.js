import React from 'react';
import {ThemeProvider} from 'styled-components/native';
import {useSelector} from 'react-redux';

const ThemeProviderWrapper = ({children}) => {
  const theme = useSelector(state => state.theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
