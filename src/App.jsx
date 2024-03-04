import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import { Box } from "@mui/joy";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ScopedCssBaseline from "@mui/joy/ScopedCssBaseline";
import Sidebar from "./components/Sidebar.jsx";
import { TodoList } from "./components/todo";
import { useState } from "react";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    children: [
      {
        index: true,
        element: <TodoList />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],

    // children: [
    //   {
    //     path: "team",
    //     element: <Team />,
    //     loader: teamLoader,
    //   },
    // ],
  },
]);

const App = () => {
  const [root, setRoot] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider
        colorSchemeNode={root}
        defaultMode="system"
        modeStorageKey="awesome-todoapp">
        <ScopedCssBaseline ref={(element) => setRoot(element)}>
          <Box width="100vw" height="100vh">
            <RouterProvider router={router} />
            <Toaster
              position="bottom-right"
              toastOptions={{ duration: 3000 }}
            />
          </Box>
        </ScopedCssBaseline>
      </CssVarsProvider>
    </QueryClientProvider>
  );
};

export default App;
