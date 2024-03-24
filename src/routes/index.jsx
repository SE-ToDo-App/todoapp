import { TodoList } from "../components/todo";
import { createFileRoute } from "@tanstack/react-router";
import { todoOptions } from "../services/todoApi";

export const Route = createFileRoute("/")({
  loaderDeps: ({ search: { list } }) => ({ list }),
  loader: async ({ context: { queryClient }, deps }) => {
    queryClient.ensureQueryData(todoOptions(deps.list));
  },
  component: TodoList,
});
