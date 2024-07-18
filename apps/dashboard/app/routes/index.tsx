import * as React from "react";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";

import { FileTable } from "@repo/file-table";
import { z } from "zod";

export const Route = createFileRoute("/")({
  validateSearch: z.object({
    page: z.coerce.number().default(1),
    pageSize: z.coerce.number().default(10),
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: Route.id });

  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <FileTable
        data={[
          { id: "1", name: "Foo" },
          { id: "2", name: "Bar" },
        ]}
        total={2}
        initialPaginationState={{
          pageIndex: searchParams.page,
          pageSize: searchParams.pageSize,
        }}
      />
    </div>
  );
}
