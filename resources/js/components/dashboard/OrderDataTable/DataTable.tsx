import { useState } from "react";
import { getFacetedUniqueValues, getFilteredRowModel } from "@tanstack/react-table";
import { flexRender, getCoreRowModel, getFacetedRowModel } from "@tanstack/react-table";
import { getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";

import { VisibilityState } from "@tanstack/react-table";
import { Table as UITable, TableBody } from "@/components/ui/table";
import { TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table";

import { TOrder } from "./orderSchema";

import columns from "./columns";
import Toolbar from "./Toolbar";
import Pagination from "./Pagination";

const DataTableInternal = <TData, TValue>({
    columns,
    data,
}: {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}) => {
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
        <div className="space-y-4">
            <Toolbar table={table} />
            <div className="rounded-md border">
                <UITable className="rounded-lg bg-white">
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
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
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </UITable>
            </div>
            <Pagination table={table} />
        </div>
    );
};

const DataTable = (props: { items: TOrder[] }) => {
    return <DataTableInternal data={props.items} columns={columns} />;
};

export default DataTable;
