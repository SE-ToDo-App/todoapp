import "react-swipeable-list/dist/styles.css";

import {
  LeadingActions,
  SwipeAction,
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
} from "react-swipeable-list";
import { Checkbox, ListItem, Sheet } from "@mui/joy";
import { editTodo } from "../../services/api";
import { useRouteContext } from "@tanstack/react-router";

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

export function ToDoItem({ todo }) {
  const {user} = useRouteContext({strict: false});
  const handleEdit = async () => {
    await editTodo({ id: todo.id, isCompleted: !todo.isCompleted , user});
  }
  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}>
          <Sheet>
          <Checkbox  label={todo.todo} checked={todo.isCompleted} onChange={handleEdit} />
          </Sheet>
      </SwipeableListItem>
    </SwipeableList>
  );
}
