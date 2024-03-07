import { TodoList } from "../components/todo";
import { createFileRoute } from "@tanstack/react-router";
import { todoLoader } from "../services/api";
export const Route = createFileRoute("/")({
  loaderDeps: ({search: {list}}) => ({list}),
  loader: async ({context, deps}) => {
    console.log(context.user, deps.list, "what")
    const data = await todoLoader(context.user, deps.list);
    console.log(data, "data")
    return data;
  },
  component: TodoList,
  staleTime: 10_000,
});
