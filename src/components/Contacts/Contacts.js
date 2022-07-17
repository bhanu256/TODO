import React, { useEffect, useState } from 'react'
import { Button, Dialog, Portal, Snackbar, Surface, Text, TextInput } from 'react-native-paper'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { Relations } from '../../models/relations';
import { ScrollView } from 'react-native';

import { getUserToFriendsList, getFriendTouserList, isExistingFriendRecord, alreadyHadFriendRequest, sendFriendRequest } from '../../services/friends';

export default function Contacts() {
  const [showDialogView, toggleDialogView] = useState(false);
  const [contactMail, setContactMail] = useState('');
  const [searchContactActive, toggleSearchContact] = useState(true);

  const [displaySnackBar, toggleSnackBar] = useState(false);
  const [snackBarContent, setSnackBarContent] = useState('');

  const [friendsList, updateFriendsList] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const uid = auth().currentUser.uid;

      const listOne = await getUserToFriendsList(uid);
      const listTwo = await getFriendTouserList(uid);

      updateFriendsList([...listOne, ...listTwo]);
    }

    getList();
  }, [])

  const searchForContact = async () => {
    try {
      toggleDialogView(false);

      // Check default case
      const user = auth().currentUser;

      if (user.email === contactMail) { updateSnackBarStatus('You cannot add yourself as friend. LOL'); return;}

      // Check whether friend exists
      const friendQuery = await firestore().collection('users').where('mail', '==', contactMail).get();

      if (friendQuery.docChanges.length === 0) { updateSnackBarStatus('User not found'); return; }

      const uid = user.uid;
      const contactUid = friendQuery.docs[0].data().uid;

      // Checks user to friend relationship
      const existingFriendRecord = await isExistingFriendRecord(uid, contactUid);

      if (existingFriendRecord.length >= 1 && existingFriendRecord[0].data().status === true) { updateSnackBarStatus('Already friend with user'); return; }

      if (existingFriendRecord.length >= 1 && existingFriendRecord[0].data().status === false) { updateSnackBarStatus('Friend request already send'); return; }

      // Checks friend to user relationship
      const hasFriendRequest = await alreadyHadFriendRequest(uid, contactUid);

      if (hasFriendRequest.length >= 1 && hasFriendRequest[0].data().status === true) { updateSnackBarStatus('Already friend with user'); return; }

      if (hasFriendRequest.length >= 1 && hasFriendRequest[0].data().status === false) { updateSnackBarStatus('Please accept user as friend'); return; }

      await firestore().collection('relations').add(new Relations(uid, contactUid));
      await sendFriendRequest(uid, contactUid);
      updateSnackBarStatus('Friend Request Send!!');
    }
    catch (err) {
      console.log(err);
      updateSnackBarStatus('Something happened. Please try again');
    }
  }

  const updateSnackBarStatus = (message) => {
    toggleSnackBar(true);
    setSnackBarContent(message);
  }

  return (
    <Surface>
      <>
        <Button mode='contained' onPress={() => toggleDialogView(true)}>Add Contact</Button>

        <Portal>
          <Dialog visible={showDialogView} onDismiss={() => { toggleDialogView(false); toggleSearchContact(true) }}>

            <Dialog.Title>Search for contact</Dialog.Title>

            <Dialog.Content>
              <TextInput
                type='outlined'
                label='Contact Mail'
                value={contactMail}
                onChangeText={(e) => { setContactMail(e); toggleSearchContact(false) }}
              />
            </Dialog.Content>

            <Dialog.Actions>
              <Button disabled={searchContactActive} onPress={() => searchForContact()}>Search</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </>

      <ScrollView>
        {(friendsList.length > 0) && friendsList.map((friend, key) => 
          <Text key={key}>{friend.name}</Text>
        )}
      </ScrollView>

      <>
        <Snackbar
          visible={displaySnackBar}
          duration={1000}
          onDismiss={() => toggleSnackBar(false)}
          action={{
            label: 'Close',
            onPress: () => toggleSnackBar(false)
          }}>
          {snackBarContent}
        </Snackbar>
      </>
    </Surface>
  )
}