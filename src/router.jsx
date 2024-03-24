import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const queryClient = new QueryClient();
export const router = createRouter({
  routeTree,
  context: {
    queryClient: queryClient,
  },
  defaultPreloadStaleTime: 0,
  defaultPendingComponent: () => <div>Loading...</div>,
});
