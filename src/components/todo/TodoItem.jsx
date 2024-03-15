import "react-swipeable-list/dist/styles.css";

import {
  LeadingActions,
  SwipeAction,
  SwipeableList,
  SwipeableListItem,
  TrailingActions,
} from "react-swipeable-list";
import { Checkbox, ListItem, Sheet } from "@mui/joy";

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
          <Sheet>
          <Checkbox  label={todo.todo} checked={todo.isCompleted}/>
          </Sheet>
      </SwipeableListItem>
    </SwipeableList>
  );
}
