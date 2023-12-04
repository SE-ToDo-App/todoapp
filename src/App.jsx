import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {TodoList} from './TodoList.jsx'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider >
  )
}

export default App