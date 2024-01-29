import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodoList } from "./TodoList.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import ScopedCssBaseline from "@mui/joy/ScopedCssBaseline";

import Login from "./components/Login.jsx";
import { useState } from "react";
import { Box } from "@mui/joy";
const queryClient = new QueryClient();
const theme = extendTheme({
  components: {
    JoyScopedCssBaseline: {
      styleOverrides: {
        root: ({ theme }) => ({
          // ...CSS object styles
        }),
      },
    },
  },
});

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
  { path: "/login", element: <Login /> },
]);

const App = () => {
  const [root, setRoot] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider
        colorSchemeNode={root}
        theme={theme}
        defaultMode="system"
        modeStorageKey="krassed-todoapp"
      >
        <ScopedCssBaseline ref={(element) => setRoot(element)}>
          <Box width="100vw" height="100vh">
            <RouterProvider router={router} />
          </Box>
        </ScopedCssBaseline>
      </CssVarsProvider>
    </QueryClientProvider>
  );
};

export default App;
