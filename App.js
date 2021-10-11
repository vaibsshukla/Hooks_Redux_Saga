import React from 'react';
import {store} from './src/store';
import RootRouter from './src/navigator/RootRouter';
import {Provider as ReduxProvider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
const App = () => {
  return (
    <SafeAreaView>
      <NavigationContainer>
        <RootRouter />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default () => (
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
);
