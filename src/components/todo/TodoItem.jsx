import "react-swipeable-list/dist/styles.css";

import {
  Checkbox,
  CircularProgress,
  Input,
  ListItem,
  Sheet,
  Typography,
} from "@mui/joy";
import {
  LeadingActions,
  SwipeAction,
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
} from "react-swipeable-list";
import { TodoPropTypes, editTodo, todoOptions } from "../../services/todoApi";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";

import PropTypes from "prop-types";
import ToDoDatePicker from "./ToDoDatePicker";
import { useDebouncedValue } from "../../utils/helper";

const SheetStyle = {
  display: "flex",
  alignItems: "center",
};

const ExpandedStyle = {
  minHeight: "150px",
  padding: "10px",
  display: "flex",
  flexDirection: "column",
};
const leadingActions = () => (
  <LeadingActions>
    <SwipeAction onClick={() => console.info("swipe action triggered")}>
      Action name
    </SwipeAction>
  </LeadingActions>
);

const trailingActions = () => (
  <TrailingActions>
    <SwipeAction
      destructive={true}
      onClick={() => console.info("swipe action triggered")}>
      Delete
    </SwipeAction>
  </TrailingActions>
);

export function ToDoItem({ todo, expanded }) {
  const [note, setNote] = useState(todo.notes);
  const [dueDate, setDueDate] = useState(todo.dueDate);

  const debouncedNote = useDebouncedValue(note, 3000);
  const { queryClient } = useRouteContext({ strict: false });
  const { list } = useSearch({ strict: false });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, isCompleted }) => editTodo({ id, isCompleted }),
    onSettled: async () => {
      return await queryClient.invalidateQueries(todoOptions(list).queryKey);
    },
  });
  const handleCheck = async () => {
    await mutateAsync({ id: todo.id, isCompleted: !todo.isCompleted });
  };
  const { mutateAsync: editNote, isPending: isNoteFetching } = useMutation({
    mutationFn: ({ id, notes }) => editTodo({ id, notes }),
  });
  useEffect(() => {
    if (debouncedNote !== undefined)
      editNote({ id: todo.id, notes: debouncedNote });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNote]);
  return !expanded ? (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}>
        <Sheet sx={SheetStyle}>
          <Checkbox
            size="lg"
            checked={isPending ? !todo.isCompleted : todo.isCompleted}
            onChange={handleCheck}
          />
          <Typography pl={1}>{todo.todo}</Typography>
        </Sheet>
      </SwipeableListItem>
    </SwipeableList>
  ) : (
    <Sheet sx={ExpandedStyle} variant="soft">
      <Sheet sx={SheetStyle} variant="soft">
        <Checkbox
          size="lg"
          checked={isPending ? !todo.isCompleted : todo.isCompleted}
          onChange={handleCheck}
        />
        <Typography pl={1}>{todo.todo}</Typography>
      </Sheet>
      <Input
        pl={1}
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        variant="soft"
        fullWidth
        endDecorator={isNoteFetching ? <CircularProgress size="sm" /> : null}
      />
      <ToDoDatePicker />
    </Sheet>
  );
}

ToDoItem.propTypes = {
  todo: PropTypes.shape(TodoPropTypes),
  expanded: PropTypes.bool,
};
