import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {TodoList} from './TodoList.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login.jsx';
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <TodoList />,
    // children: [
    //   {
    //     path: "team",
    //     element: <Team />,
    //     loader: teamLoader,
    //   },
    // ],
  },
{  path: "/login",
  element: <Login />,}

]);


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider >
  )
}

export default App