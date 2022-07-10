/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider as PaperProvider, DarkTheme } from 'react-native-paper';
import { en, registerTranslation } from 'react-native-paper-dates';
import App from './src/App';
import {name as appName} from './app.json';

registerTranslation('en', en);

const Main = () => {
  return (
    <PaperProvider theme={DarkTheme}>
      <App />
    </PaperProvider>
  )
}

AppRegistry.registerComponent(appName, () => Main);
