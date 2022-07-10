import React, { useState } from 'react'
import { Button, Surface, Text, TextInput } from 'react-native-paper'
import { DatePickerInput } from 'react-native-paper-dates';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export default function AddTodo() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');

  const addTodo = async () => {
    try {
      const date = new Date();
      console.log(date.toUTCString());
      const obj = {
        name: title,
        createdOn: date.toUTCString(),
        completeBy: date.toUTCString(),
        description: desc,
        createdBy: auth().currentUser.uid,
        status: 0
      };
  
      await firestore().collection('todos').add(obj);
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <Surface>
      <Text variant='displayMedium'>AddTodo</Text>

      <>
        <TextInput
          type='outlined'
          label='Title'
          value={title}
          onChangeText={(e) => setTitle(e)}
        />

        <TextInput
          type='outlined'
          label='Desc'
          value={desc}
          multiline={true}
          numberOfLines={3}
          onChangeText={(e) => setDesc(e)}
        />

        <TextInput
          type='outlined'
          label='Completed by'
          value={date}
          placeholder='DD/MM/YYYY'
          onChangeText={(e) => setDate(e)}
        />

        <Button mode='contained' onPress={() => addTodo()}>Submit</Button>
      </>
    </Surface>
  )
}