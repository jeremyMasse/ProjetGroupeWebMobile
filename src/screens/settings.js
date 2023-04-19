import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {toggleTheme} from '../actions/themeAction';
import ThemeProvider from '../components/ThemeProvider';

const Settings = () => {
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

  return (
    <ThemeProvider>
      <TouchableOpacity
        onPress={() => {
          dispatch(toggleTheme());
        }}>
        <Text style={{color: theme.text}}>Changer de thème</Text>
      </TouchableOpacity>
    </ThemeProvider>
  );
};

export default Settings;
