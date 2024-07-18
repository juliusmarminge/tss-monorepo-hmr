import * as React from "react";
import {
  createColumnHelper,
  useReactTable,
  PaginationState,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

export interface TableData {
  id: string;
  name: string;
}

const columnHelper = createColumnHelper<TableData>();
const createColumns = () => [
  columnHelper.accessor("id", {
    enableHiding: false,
  }),
  columnHelper.accessor("name", {
    meta: { title: "Name" },
    header: ({ column }) => (
      <span className="whitespace-nowrap text-xs font-semibold text-foreground sm:text-sm">
        {(column.columnDef.meta as { title: string }).title}
      </span>
    ),
    cell: ({ row }) => {
      return (
        <span className="whitespace-nowrap text-xs text-muted-foreground sm:text-sm">
          {row.original.name}
        </span>
      );
    },
    enableSorting: false,
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span>...</span>,
    cell: function Cell({ row, table }) {
      const [open, setOpen] = React.useState(false);

      return <>...</>;
    },
  }),
];

export function FileTable(props: {
  initialPaginationState: PaginationState;
  data: TableData[];
  total: number;
}) {
  const columns = React.useMemo(() => createColumns(), []);

  const table = useReactTable({
    columns,
    data: props.data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex h-full w-full flex-col items-center justify-center py-48 text-center">
                    <h1 className="text-lg font-medium sm:text-xl">
                      No files uploaded yet
                    </h1>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      Upload some files to get started!
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="h-12"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="flex flex-1 items-center gap-2">
          <span className="font- line-clamp-1 w-max text-sm tabular-nums text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {props.total}{" "}
            row
            {table.getFilteredSelectedRowModel().rows.length !== 1 && "s"}{" "}
            selected.
          </span>
        </div>
      </div>
    </div>
  );
}
