import React, { useState } from 'react'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import { webClientId } from '../secrets';

GoogleSignin.configure({
  webClientId: webClientId
});

const Login = ({ navigation }) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const GoogleIcon = (props) => {
    return <Icon name='google' {...props} />
  }

  const loginViaMail = async () => {
    await auth().signInWithEmailAndPassword(mail, password);
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
          placeholder='Enter Mail'
          value={mail}
          onChangeText={value => setMail(value)}
        />

        <TextInput 
          placeholder='Enter Password'
          value={password}
          onChangeText={value => setPassword(value)}
        />

        <Button onPress={() => loginViaMail()} title='Submit'>
          SUBMIT
        </Button>
      </>

      <Text>OR</Text>
      
      <>
        <Button accessoryLeft={GoogleIcon} onPress={() => loginViaGoogle()} title='Login via Google'>
          Login via Google
        </Button>
      </>
    </Surface>
  )
};

export default Login;