import React from 'react'
import { StyleSheet } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper'

const Todo = (props) => {
  return (
    <Card>
      <Card.Title title={props.data.name}/>
      <Card.Content>
        <Paragraph>{props.data.description}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button>Submit</Button>
      </Card.Actions>
    </Card>
  )
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row-reverse'
  }
})

export default Todo;