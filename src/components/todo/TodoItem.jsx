import "react-swipeable-list/dist/styles.css";

import {
  LeadingActions,
  SwipeAction,
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
} from "react-swipeable-list";

import ListItemText from "@mui/material/ListItemText";

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
  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}>
        <ListItemText primary={todo.todo} />
      </SwipeableListItem>
    </SwipeableList>
  );
}
