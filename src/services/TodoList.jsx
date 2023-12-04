import { useState } from 'react';
import { Input, Button } from '@mui/joy';
function TodoList() {
    const [todos, setTodos] = useState([
        'Create Blockchain App',
        'Create a Youtube Tutorial'
    ]);
    const [input, setInput] = useState('');
    const addTodo = (e) => {
        e.preventDefault();
        setTodos([...todos, input]);
        setInput('')
    };
    return (
        <div className="TodoList">
            <h2> TODO List App</h2>
            <form>
                <Input label="Make Todo" variant="outlined" style={{ margin: "0px 5px" }} size="small" value={input}
                    onChange={e => setInput(e.target.value)} />
                <Button color="primary" onClick={addTodo}  >Add Todo</Button>
            </form>
            <ul>
              {todos.map(todo => (
                <li>{todo}</li>
              ))}
                
              </ul>
        </div>
    );
}
export default TodoList;