// ThemeProvider.js
import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

const ThemeProvider = ({children}) => {
  const theme = useSelector(state => state.theme);

  const backgroundColor = theme.background;

  return (
    <View style={{flex: 1, backgroundColor: backgroundColor}}>{children}</View>
  );
};

export default ThemeProvider;
