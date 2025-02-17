import { createRootRoute } from "@tanstack/react-router";
import { Link, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";
import * as React from "react";
import { DefaultCatchBoundary } from "../components/DefaultCatchBoundary";
import { NotFound } from "../components/NotFound";

export const Route = createRootRoute({
  meta: () => [
    {
      charSet: "utf-8",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
  links: () => [],
  scripts: () => [{ src: "https://cdn.tailwindcss.com" }],
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <Html>
      <Head>
        <Meta />
      </Head>
      <Body>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/"
            search={{ page: 0, pageSize: 10 }}
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>{" "}
          <Link
            // @ts-expect-error
            to="/this-route-does-not-exist"
            activeProps={{
              className: "font-bold",
            }}
          >
            This Route Does Not Exist
          </Link>
        </div>
        <hr />
        {children}
        <ScrollRestoration />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </Body>
    </Html>
  );
}
