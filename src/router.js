import { routeTree } from "./routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { user } from "./services/firebase.config";

export const router = createRouter({
  routeTree,
  context: {
    user: user,
  },
});
