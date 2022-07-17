import React, { useEffect, useState } from 'react'
import { Button, Surface, Text, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { getUserToFriendsList, getFriendTouserList } from '../../services/friends';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Group } from '../../models/group';
import { Relations } from '../../models/relations';
import { navigation } from '../../navigators/NavigationRef';

const AddNewGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [friends, updateFriends] = useState([]);
  const [selectedFriends, updateSelectedFriends] = useState([]);

  useEffect(() => {
    const getList = async () => {
      const uid = auth().currentUser.uid;

      let listOne = await getUserToFriendsList(uid);
      let listTwo = await getFriendTouserList(uid);

      listOne = listOne.map((value, i) => {
        return {id: i+1, name: value.name, data: value}
      });

      listTwo = listTwo.map((value, i) => {
        return {id: i+1, name: value.name, data: value}
      });

      updateFriends([{id: 0, name: 'Friends', children: [...listOne, ...listTwo]}]);
    }

    getList();
  }, []);

  useEffect(() => {
    console.log(selectedFriends);
  }, [selectedFriends]);

  const createNewGroup = async () => {
    const uid = auth().currentUser.uid;

    const groupData = await (await firestore().collection('group').add(new Group(groupName, uid))).get();
    const groupID = groupData.id;

    const batch = firestore().batch();
    batch.set(firestore().collection('relations').doc(), new Relations(groupID, uid, true, true));

    for (let i = 0; i < selectedFriends.length; i++) {
      const friend = friends[0].children[selectedFriends[0] - 1];
      const relationRef = firestore().collection('relations').doc();

      batch.set(relationRef, new Relations(groupID, friend.data.uid, true, true));
    }

    await batch.commit()
    navigation('allGroups');
  }

  return (
    <Surface>
      <Text>Add new group</Text>

      <TextInput
        type='outlined'
        label='Group Name'
        value={groupName}
        onChangeText={(e) => setGroupName(e)}
      />

        <SectionedMultiSelect
          items={friends}
          IconRenderer={Icon}
          uniqueKey='id'
          subKey='children'
          selectText='Choose some friends...'
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={(e) => updateSelectedFriends(e)}
          selectedItems={selectedFriends}
        />

      <Button onPress={() => createNewGroup()}>Create Group</Button>
    </Surface>
  )
};

export default AddNewGroup;
