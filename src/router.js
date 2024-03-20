import { routeTree } from "./routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { user } from "./services/firebase.config";
import { QueryClient } from "@tanstack/react-query";


export const queryClient = new QueryClient();
export const router = createRouter({
  routeTree,
  context: {
    user: user,
    queryClient: queryClient,

  },
});
