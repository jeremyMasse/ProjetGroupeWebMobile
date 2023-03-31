import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/config/store';
import Routes from './src/config/routes';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
