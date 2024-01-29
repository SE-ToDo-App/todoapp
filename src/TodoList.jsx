import React, { useState, useEffect } from "react";
import { Input, Button, Box, Typography, Checkbox } from "@mui/joy";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";

import FormControlLabel from "@mui/material/FormControlLabel";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./services/list_service";
import {
  onSnapshot,
  collection,
  query,
  where,
  limit,
  addDoc,
  getFirestore,
} from "firebase/firestore";
import { db, useAuth } from "./services/firebase.config";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";

import { ToDoItem } from "./ToDoItem";
import useTodos from "./utils/hooks/useTodos";

const containerStyle = {
  maxWidth: "350px",
  width: `100%`,
};

const inputStyle = {
  margin: "0px 5px 10px 0px",
  width: "100%",
};

const buttonStyle = {
  width: "100%",
  margin: "0 0 10px 0",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "24px",
  fontWeight: "bold",
  color: "#3f51b5",
};

export function TodoList() {
  const [user] = useAuth();
  const [input, setInput] = useState("");

  const [todos, loading, error, snapshot] = useCollectionData(
    user
      ? query(collection(db, "todos"), where("uid", "==", user.uid), limit(10))
      : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  console.log(todos, loading, error, snapshot);

  const addTodo = async () => {
    if (input) {
      setInput("");
      if (!user) return;
      try {
        await addDoc(collection(db, `todos`), {
          todoName: input,
          uid: user.uid,
        });
      } catch (e) {
        console.log(`Nutten` + e);
      }
    }
  };

  const handleEnter = (e) => {
    if (e.key === `Enter`) {
      e.preventDefault();
      addTodo();
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="App">
      <Box display="flex" width="100%" justifyContent="center">
        <Box sx={containerStyle}>
          <Typography variant="h1" sx={titleStyle}>
            {" "}
            TODO List App
          </Typography>
          <form>
            <Input
              placeholder="Type in here..."
              label="Make Todo"
              variant="outlined"
              style={inputStyle}
              size="md"
              value={input}
              onKeyDown={handleEnter}
              onChange={handleChange}
            />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
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
            {todos?.map((todo, index) => (
              <React.Fragment key={index}>
                <ToDoItem todo={todo.todoName} />
                {index < todos.length - 1 && <Divider light />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </div>
  );
}
