import { useState, useEffect } from 'react';
import { Input, Button } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from './services/list_service';
import  {onSnapshot, collection} from 'firebase/firestore';
import { db } from './services/firebase.config';
export function TodoList() {
    // const {data} = useQuery({
    //     queryKey: ['todos'],
    //     queryFn: fetchTodos
    // })
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
    return (
        <div className="App">
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