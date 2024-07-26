import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/apps/$appId")({
  loader: async () => {
    return { data: "Hello /$appId/foo!" };
  },
  component: () => <div>Hello /$appId/foo!</div>,
});
