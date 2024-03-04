
import ListItemText from '@mui/material/ListItemText';
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from 'react-swipeable-list';
  import 'react-swipeable-list/dist/styles.css';

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => console.info('swipe action triggered')}>
        Action name
      </SwipeAction>
    </LeadingActions>
  );
  
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => console.info('swipe action triggered')}
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  );

export function ToDoItem ({todo}){
    return (
        <SwipeableList>
        <SwipeableListItem
         leadingActions={leadingActions()}
         trailingActions={trailingActions()}
         >
        <ListItemText primary={todo} />
        
      </SwipeableListItem>
      </SwipeableList>
        )
}