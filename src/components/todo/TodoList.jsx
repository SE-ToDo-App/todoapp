import { Box, Button, Input, Typography } from "@mui/joy";
import React, { useState } from "react";
import {
  addTodo as addTodoFirebase,
  useTodos,
  todoCountLoader,
} from "../../services/api";
import { useAuth } from "../../services/firebase.config";

import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { ToDoItem } from "./TodoItem";
import { useLoaderData, useSearch } from "@tanstack/react-router";

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

  const todos = useLoaderData({strict: false});
  console.log(todos, "todos")

  const addTodo = async () => {
    if (input) {
      setInput("");
      if (!user) return;
      await addTodoFirebase({ todo: input, group: "groupplaceholder", user });
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo();
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
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
            variant="soft">
            Add Todo
          </Button>
        </Box>
      </form>
      <List sx={{ p: 0 }}>
        {todos?.map((todo, index) => (
          <React.Fragment key={index}>
            <ToDoItem todo={todo} />
            {index < todos.length - 1 && <Divider light />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}
