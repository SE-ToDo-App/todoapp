import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { app, auth } from "./services/firebase.config";

import { Box } from "@mui/joy";
import ScopedCssBaseline from "@mui/joy/ScopedCssBaseline";
import { Toaster } from "react-hot-toast";
import { getAuth } from "firebase/auth";
import { routeTree } from "./routeTree.gen";
import { useState } from "react";

const router = createRouter({
  routeTree,
  context: {
    user: undefined,
  },
});

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Sidebar />,
//     loader: todoCountLoader,
//     children: [
//       {
//         index: true,
//         element: <TodoList />,
//       },
//       {
//         path: "login",
//         element: <Login />,
//       },
//       {
//         path: "register",
//         element: <Register />,
//       },
//     ],

// children: [
//   {
//     path: "team",
//     element: <Team />,
//     loader: teamLoader,
//   },
// ],

const App = () => {
  const [root, setRoot] = useState(null);
  return (
    <CssVarsProvider
      colorSchemeNode={root}
      defaultMode="system"
      modeStorageKey="awesome-todoapp">
      <ScopedCssBaseline ref={(element) => setRoot(element)}>
        <Box width="100vw" height="100vh">
          <RouterProvider router={router} />
          <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        </Box>
      </ScopedCssBaseline>
    </CssVarsProvider>
  );
};

export default App;
