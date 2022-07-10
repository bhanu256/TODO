/**
 * @format
 */
import React, { useEffect } from 'react';
import {AppRegistry} from 'react-native';
import { Provider as PaperProvider, DarkTheme } from 'react-native-paper';
import { en, registerTranslation } from 'react-native-paper-dates';
import App from './src/App';
import {name as appName} from './app.json';
import message from '@react-native-firebase/messaging';
import { notificationListeners } from './src/services/notifications';

registerTranslation('en', en);

const Main = () => {
  useEffect(() => {
    notificationListeners();
  }, []);

  return (
    <PaperProvider theme={DarkTheme}>
      <App />
    </PaperProvider>
  )
}

AppRegistry.registerComponent(appName, () => Main);
