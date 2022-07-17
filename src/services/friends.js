import { SEND_FRIEND_REQUEST_URL } from '../constants';
import firestore from '@react-native-firebase/firestore'

export const getUserToFriendsList = async (uid) => {
  const list = [];
  const snapShot = await firestore().collection('relations').where('user', '==', uid).where('status', '==', true).where('isGroup', '==', false).get();

  for (let i = 0; i < snapShot.docs.length; i++) {
    const data = snapShot.docs[i].data();

    const doc = await firestore().collection('users').doc(data.friend).get();
    list.push(doc.data());
  }

  return list;
}

export const getFriendTouserList = async (uid) => {
  const list = [];
  const snapShot = await firestore().collection('relations').where('friend', '==', uid).where('status', '==', true).where('isGroup', '==', false).get();

  for (let i = 0; i < snapShot.docs.length; i++) {
    const data = snapShot.docs[i].data();

    const doc = await firestore().collection('users').doc(data.user).get();
    list.push(doc.data());
  }

  return list;
}

export const isExistingFriendRecord = async (uid, fuid) => {
  const snapShot = await firestore().collection('relations').where('user', '==', uid).where('friend', '==', fuid).get();

  return snapShot.docs;
}

export const alreadyHadFriendRequest = async (uid, fuid) => {
  const snapShot = await firestore().collection('relations').where('user', '==', fuid).where('friend', '==', uid).get();

  return snapShot.docs;
}

export const sendFriendRequest = (from, to) => {
  const body = {
    from: from,
    to: to
  };

  return fetch(SEND_FRIEND_REQUEST_URL, {
    method: 'POST',
    body: JSON.stringify(body),
    mode: 'cors'
  });
}