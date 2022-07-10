import React, { useState } from 'react'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {navigation} from '../navigators/NavigationRef';
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import { webClientId } from '../secrets';

GoogleSignin.configure({
  webClientId: webClientId
});

const Login = () => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const GoogleIcon = (props) => {
    return <Icon name='google' {...props} />
  }

  const loginViaMail = async () => {
    auth().createUserWithEmailAndPassword(mail, password).then(async (userCredentials) => {
      const userProfile = {
        uid: userCredentials.user.uid,
        name: name,
        mail: userCredentials.user.email,
        password: password
      };

      await firestore().collection('users').doc(userProfile.uid).set({...userProfile});
    })
  }

  const loginViaGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      console.log(error.code);
    }
  }

  return (
    <Surface>
      <>
        <TextInput 
          placeholder='Name'
          value={name}
          onChangeText={value => setName(value)}
        />

        <TextInput 
          placeholder='Enter Mail'
          value={mail}
          onChangeText={value => setMail(value)}
        />

        <TextInput
          placeholder='Enter Password'
          value={password}
          onChangeText={value => setPassword(value)}
        />

        <Button onPress={() => loginViaMail()} title='SUBIT'>
          SUBMIT
        </Button>
      </>

      <Text>OR</Text>
      
      <>
        <Button accessoryLeft={GoogleIcon} onPress={() => loginViaGoogle()} title='SIGN via goo'>
          Signup using Google
        </Button>
      </>

      <>
        <Text>Have an account?</Text>
        <Button onPress={() => {navigation('Login')}} title='Login'>Login</Button>
      </>

    </Surface>
  )
};

export default Login;