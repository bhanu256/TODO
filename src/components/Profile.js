import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import { navigation } from '../navigators/NavigationRef'
import firestore from '@react-native-firebase/firestore'
import Inprogress from './helpers/Inprogress';
import { Button, Surface, Text } from 'react-native-paper';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const uid = auth().currentUser.uid;

    firestore().collection('users').doc(uid).get().then((docSnap) => {
      setUser({ ...docSnap.data() });
    });
  }, []);

  const logout = async () => {
    await auth().signOut();
    navigation('Signup');
  }

  if (user === null) {
    return (
      <Inprogress />
    )
  }
  else {
    return (
      <Surface>
        <Text>Profile</Text>
        <Text variant='displaySmall'>{user.name}</Text>
        <Text variant='displaySmall'>{user.mail}</Text>
        <Button onPress={() => logout()} title='Logout'>Logout</Button>
      </Surface>
    )
  }
}