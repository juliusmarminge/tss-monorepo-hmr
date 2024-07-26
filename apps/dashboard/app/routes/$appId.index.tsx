import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$appId/")({
  loader: async () => {
    if (Math.random() > 0.75) {
      throw new Error("Oh no!");
    }
    return { data: "Hello /$appId/foo!" };
  },
  component: () => <div>Hello /$appId/foo!</div>,
});
