import { Box, Button, Input, Typography } from "@mui/joy";
import { addTodo, todoOptions } from "../../services/todoApi";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";

import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import ToDoDatePicker from "./ToDoDatePicker";
import { ToDoItem } from "./TodoItem";
import { useState } from "react";

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
  const [input, setInput] = useState("");
  const [expanded, setExpanded] = useState("");
  const { list } = useSearch({ strict: false });

  const { data: todos } = useSuspenseQuery(todoOptions(list));
  const { queryClient } = useRouteContext({ strict: false });

  const { mutateAsync } = useMutation({
    mutationFn: ({ todo, group }) => addTodo({ todo, group }),
    onSettled: () => {
      setInput("");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(todoOptions(list).queryKey);
    },
  });

  const handleAddTodo = async () => {
    if (!input) return;
    await mutateAsync({ todo: input, group: list });
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTodo();
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <Box sx={containerStyle}>
      <Typography variant="h1" sx={titleStyle}>
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
            onClick={handleAddTodo}
            style={buttonStyle}
            variant="soft">
            Add Todo
          </Button>
        </Box>
      </form>
      <List sx={{ p: 0 }}>
        {todos?.map((todo) => (
          <div key={todo.id} onClick={() => setExpanded(todo.createdAt)}>
            <ToDoItem todo={todo} expanded={expanded === todo.createdAt} />
          </div>
        ))}
      </List>
      <ToDoDatePicker />
    </Box>
  );
}
