import Sidebar from "../components/Sidebar.jsx";
import { TanStackRouterDevtools, } from "@tanstack/router-devtools";
import { createRootRoute, defer} from "@tanstack/react-router";
import { groupLoader, todoCountLoader } from "../services/api.js";
import { DEFAULT_GROUP_NAME } from "../utils/constants.js";
import { auth } from "../services/firebase.config.js";
export const Route = createRootRoute({
  component: () => (
    <>
      <Sidebar />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
  validateSearch: (search) => ({list : search.list || DEFAULT_GROUP_NAME}),
  loaderDeps: ({search: {list}}) => ({list}),
  beforeLoad: ({context}) => {
    const user = auth.currentUser || context.user;
    return { user };
  },

  loader: async ({ context, deps }) => {
    const data = await groupLoader(context.user);
    const count = todoCountLoader(context.user, deps.list);
    return { groups: data, count: defer(count) };
  },
  staleTime: 100_000,
});
