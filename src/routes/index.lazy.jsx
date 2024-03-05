import { TodoList } from "../components/todo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: TodoList,
  staleTime: 10_000,
});
