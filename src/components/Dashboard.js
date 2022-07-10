import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Surface, Text } from 'react-native-paper'
import auth from '@react-native-firebase/auth'
import Todo from './helpers/Todo';

export default function Dashboard() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const queryAllTodos = async () => {
      const querySnap = await firestore().collection('todos').where('createdBy', '==', auth().currentUser.uid).get();
      
      querySnap.forEach((docSnap) => {
        const doc = docSnap.data();
        setTodos(todos => [...todos, doc]);
      });
    };


    try {
      queryAllTodos();
    }
    catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <Surface>
      <Text variant='displayMedium'>Dashboard</Text>

      {todos.map((todo, i) => <Todo data={todo} key={i}/>)}
    </Surface>
  )
}