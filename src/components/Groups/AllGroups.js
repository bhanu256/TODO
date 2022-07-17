import React, { useEffect, useState } from 'react'
import { Surface, Button, Text } from 'react-native-paper';
import { navigation } from '../../navigators/NavigationRef';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Group } from '../../models/group';

const AllGroups = () => {
  const [groups, updateGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      const uid = auth().currentUser.uid;
      const groupDocs = await getGroupsWithUser(uid);

      const group = [];
      for (let i = 0; i<groupDocs.length; i++) {
        group.push(groupDocs[i].data());
      }

      updateGroups(group);
    }

    getGroups();
  }, []);

  const getGroupsWithUser = async (uid) => {
    const groups = [];
    const snapShot = await firestore().collection('relations').where('friend', '==', uid).where('isGroup', '==', true).get();

    for (let i = 0; i < snapShot.docs.length; i++) {
      const groupID = snapShot.docs[i].data().user;
      const group = await firestore().collection('group').doc(groupID).get();

      groups.push(group);
    }

    return groups;
  }

  return (
    <Surface>
      <>
        <Button mode='contained' onPress={() => navigation('addNewGroup')}>Add Group</Button>
      </>

      <>
        <Text>Groups</Text>
        {(groups.length > 0) && groups.map((group, key) => 
          <Text key={key}>{group.name}</Text>
        )}
      </>
    </Surface>
  )
};

export default AllGroups;
