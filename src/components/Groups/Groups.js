import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../../navigators/NavigationRef';

import AllGroups from './AllGroups';
import AddNewGroup from './AddNewGroup';

const Stack = createNativeStackNavigator();

const Groups = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='allGroups' component={AllGroups} />
        <Stack.Screen name='addNewGroup' component={AddNewGroup} />
      </Stack.Navigator>
  )
};

export default Groups;