import Sidebar from "../components/Sidebar.jsx";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { app } from "../services/firebase.config";
import { createRootRoute } from "@tanstack/react-router";
import { getAuth } from "firebase/auth";
import { groupLoader } from "../services/todo/addTodo.js";

export const Route = createRootRoute({
  component: () => (
    <>
      <Sidebar />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
  beforeLoad: () => {
    const user = getAuth(app);

    return { user: user.currentUser };
  },
  loader: async ({ context }) => {
    console.log("context", context);
    const groups = await groupLoader(context.user);
    console.log("groups", groups);
    return groups;
  },
  staleTime: 100_000,
});
