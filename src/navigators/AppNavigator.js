import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Dashboard from '../components/Dashboard';
import AddTodo from '../components/AddTodo';
import Profile from '../components/Profile';
import Contacts from '../components/Contacts';
import Groups from '../components/Groups';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
      <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name='Dashboard' component={Dashboard}/>
      <Tab.Screen name='Add' component={AddTodo}/>
      <Tab.Screen name='Profile' component={Profile}/>
      <Tab.Screen name='Contacts' component={Contacts}/>
      <Tab.Screen name='Groups' component={Groups}/>
      </Tab.Navigator>
  )
}

const CheckListIcon = (props) => {
  return (<Icon name='checkmark-square' {...props} />)
}

const AddTodoIcon = (props) => {
  return (<Icon name='plus-square' {...props} />)
}

const ProfileIcon = (props) => {
  return (<Icon name='settings' {...props} />)
}

const ContactsIcon = (props) => {
  return (<Icon name='person' {...props} />)
}

const GroupIcon = (props) => {
  return (<Icon name='people' {...props} />)
}

const BottomTabBar = ({navigation, state}) => {
  return (
    <BottomNavigation 
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title='Dashboard' icon={CheckListIcon}/>
        <BottomNavigationTab title='Add' icon={AddTodoIcon}/>
        <BottomNavigationTab title='Profile' icon={ProfileIcon}/>
        <BottomNavigationTab title='Contacts' icon={ContactsIcon}/>
        <BottomNavigationTab title='Groups' icon={GroupIcon}/>
    </BottomNavigation>
  );
}

// const AppNavigator = () => {
//   return (
//     <Navigator tabBar={props => <BottomTabBar {...props} />} Tab.ScreenOptions={{headerShown: false}}>
//       <Tab.Screen name='Dashboard' component={Dashboard}/>
//       <Tab.Screen name='Add' component={AddTodo}/>
//       <Tab.Screen name='Profile' component={Profile}/>
//       <Tab.Screen name='Contacts' component={Contacts}/>
//       <Tab.Screen name='Groups' component={Groups}/>
//     </Navigator>
//   )
// }

export default AppNavigator;