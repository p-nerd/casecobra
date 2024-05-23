import type { TOrder } from "@/components/dashboard/OrderDataTable/orderSchema";

import { useState } from "react";
import { getFacetedUniqueValues, getFilteredRowModel } from "@tanstack/react-table";
import { flexRender, getCoreRowModel, getFacetedRowModel } from "@tanstack/react-table";
import { getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";

import { VisibilityState } from "@tanstack/react-table";
import { Container, Header } from "@/components/ui2/misc";
import { Table as UITable, TableBody } from "@/components/ui/table";
import { TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, ColumnFiltersState, SortingState } from "@tanstack/react-table";

import columns from "@/components/dashboard/OrderDataTable/columns";

import SiteLayout from "@/layouts/SiteLayout";
import Toolbar from "@/components/dashboard/OrderDataTable/Toolbar";
import Pagination from "@/components/dashboard/OrderDataTable/Pagination";

const OrderDataTable = <TData, TValue>({
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

const Orders = (props: { orders: TOrder[] }) => {
    console.log(props.orders);

    return (
        <SiteLayout title="Manage Orders">
            <Container className="mx-auto space-y-6 py-12">
                <Header>Manage Orders</Header>
                <OrderDataTable data={props.orders} columns={columns} />
            </Container>
        </SiteLayout>
    );
};

export default Orders;
