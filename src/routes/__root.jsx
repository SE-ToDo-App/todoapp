import { createRootRoute, defer } from "@tanstack/react-router";
import { groupLoader, todoCountLoader } from "../services/api.js";

import { DEFAULT_GROUP_NAME } from "../utils/constants.js";
import Sidebar from "../components/Sidebar.jsx";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { auth } from "../services/firebase.config.js";
import { groupQueryOptions } from "../services/groupApi.js";
import { todoCountOptions } from "../services/todoApi.js";

export const Route = createRootRoute({
  component: () => (
    <>
      <Sidebar />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
  validateSearch: (search) => ({ list: search.list || DEFAULT_GROUP_NAME }),
  loaderDeps: ({ search: { list } }) => ({ list }),

  loader: async ({ context: { queryClient }, deps }) => {
    queryClient.ensureQueryData(groupQueryOptions());
    queryClient.ensureQueryData(todoCountOptions(deps.list));
  },
  staleTime: 100_000,
});
