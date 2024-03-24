import { Box, CssBaseline } from "@mui/joy";
import { queryClient, router } from "./router";

import { CssVarsProvider } from "@mui/joy/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";

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
  return (
    <CssVarsProvider
      defaultMode="system"
      modeStorageKey="awesome-todoapp"
      disableNestedContext>
      <CssBaseline />
      <Box width="100vw" height="100vh">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
      </Box>
    </CssVarsProvider>
  );
};

export default App;
