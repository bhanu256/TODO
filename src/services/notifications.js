import message from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const getPermissions = async () => {
  const hasPermission = await AsyncStorage.getItem('hasNotificationPermission');
  if (hasPermission !== null) return;

  const permissionStatus = await message().hasPermission();
  if (permissionStatus) return;

  await requestPermission();
}

const requestPermission = async () => {
  try {
    const status = await message().requestPermission();
    const enabled = status === messaging.AuthorizationStatus.AUTHORIZED || status === messaging.AuthorizationStatus.PROVISIONAL;

    await AsyncStorage.setItem('hasNotificationPermission', enabled);
  }
  catch (err) {
    console.error(err);
  }
}

export const getFCMToken = async () => {
  const token = await AsyncStorage.getItem('fcmToken');

  if (token) return token;

  const newToken = await message().getToken();
  const uid = auth().currentUser.uid;
  const userProfile = await (await firestore().collection('users').doc(uid).get()).data;
  const tokens = userProfile?.tokens || [];
  tokens.push(newToken);

  await firestore().collection('users').doc(uid).update({tokens: tokens});
  await AsyncStorage.setItem('fcmToken', newToken);
}

export const notificationListeners = () => {

  message().onNotificationOpenedApp(remoteMessage => {
    console.log('From background state: ' + remoteMessage);
  });

  message().getInitialNotification().then(remoteMessage => {
    console.log('From quit state: ' + remoteMessage);
  });

  message().onMessage(async(message) => {
    console.log(message);
  });

  message().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
}