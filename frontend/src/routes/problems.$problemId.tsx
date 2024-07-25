import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/problems/$problemId")({
  component: () => <div>Hello This Problem</div>,
});
