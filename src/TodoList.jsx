import React, { useState, useEffect } from 'react';
import { Input, Button, Box, Typography, Checkbox } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add'; 
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from './services/list_service';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from './services/firebase.config';

export function TodoList() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([
    'Create Blockchain App',
    'Create a Youtube Tutorial'
  ]);

  useEffect(() => {
    onSnapshot(collection(db, 'todos'), (snapshot) => {
      setTodos(snapshot.docs.map(doc => doc.data().todo))
    })
  }, [input]);

  const addTodo = () => {
    setTodos([...todos, input]);
    setInput('')
  };

  const containerStyle = {
    maxWidth: '360px', 
  };

  const inputStyle = {
    margin: "0px 5px 10px 0px",
    width: '100%', 
  };

  const buttonStyle = {
    width: '100%', 
    margin: '0 0 10px 0',
  };

  const listItemStyle = {
    marginBottom: '10px', 
    padding: '15px', 
    border: `1px solid`
  };

  const titleStyle = {
    textAlign: 'center', 
    marginBottom: '20px', 
    fontSize: '24px', 
    fontWeight: 'bold', 
    color: '#3f51b5', 
  };

  return (
    <div className="App">
      <Container maxWidth="xl" sx={containerStyle}>
        <Typography variant="h1" sx={titleStyle}> TODO List App</Typography>
        <form>
          <Input
            placeholder="Type in here..."
            label="Make Todo"
            variant='outlined'
            style={inputStyle}
            size="md" value={input}
            onChange={e => setInput(e.target.value)} 
          />
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              startDecorator={<AddIcon />}
              onClick={addTodo}
              style={buttonStyle}
              variant="soft"
            >
              Add Todo
            </Button>
          </Box>
        </form>
        <List sx={{ p: 0 }}>
          {todos.map((todo, index) => (
            <React.Fragment key={index}>
              <ListItem component="div" disablePadding sx={listItemStyle}>
                <ListItemText primary={todo} />
                {index < todos.length - 1 && <Divider light />}
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Container>
    </div>
  );
}