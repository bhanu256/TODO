import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth'
import message from '@react-native-firebase/messaging'

import Login from './components/Login';
import Signup from './components/Signup';
import AppNavigator from './navigators/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef, navigation } from './navigators/NavigationRef';
import { getFCMToken, getPermissions } from './services/notifications';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    const subcribe = auth().onAuthStateChanged(async (user) => {
      await getPermissions();
      if (user != null) {
        await getFCMToken();
        navigation('AppNavigator')
      }
    });
  }, []);

  return (
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={'Signup'}>
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Signup' component={Signup} />
              <Stack.Screen name='AppNavigator' component={AppNavigator}/>
            </Stack.Navigator>
          </NavigationContainer>
  )
}

export default App
