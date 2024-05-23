import type { TOrder } from "./orderSchema";
import type { ColumnDef, Column, Row } from "@tanstack/react-table";

import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { ArrowDownIcon, ArrowUpIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { CircleIcon, QuestionMarkCircledIcon, StopwatchIcon } from "@radix-ui/react-icons";
import { DotsHorizontalIcon, CaretSortIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { cn, formatDate, formatPrice } from "@/lib/utils";

const ColumnHeader = <TData, TValue>(props: {
    column: Column<TData, TValue>;
    title: string;
    className?: string;
}) => {
    if (!props.column.getCanSort()) {
        return <div className={cn(props.className)}>{props.title}</div>;
    }

    return (
        <div className={cn("flex items-center space-x-2", props.className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        <span>{props.title}</span>
                        {props.column.getIsSorted() === "desc" ? (
                            <ArrowDownIcon className="ml-2 h-4 w-4" />
                        ) : props.column.getIsSorted() === "asc" ? (
                            <ArrowUpIcon className="ml-2 h-4 w-4" />
                        ) : (
                            <CaretSortIcon className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => props.column.toggleSorting(false)}>
                        <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => props.column.toggleSorting(true)}>
                        <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Desc
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => props.column.toggleVisibility(false)}>
                        <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Hide
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

const RowActions = ({ row }: { row: Row<TOrder> }) => {
    const handleDelete = () => {
        if (confirm("Are you sure?")) {
            router.delete(route("dashboard.orders.destroy", { order: row.original.id }));
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem
                    onClick={() =>
                        router.get(route("dashboard.orders.show", { order: row.original.id }))
                    }
                >
                    Details
                </DropdownMenuItem>
                <a href={row.original.croppedImageUrl} target="_blank">
                    <DropdownMenuItem>Cropped Image</DropdownMenuItem>
                </a>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export const statuses = [
    {
        value: "awaiting",
        label: "Awaiting",
        icon: QuestionMarkCircledIcon,
    },

    {
        value: "processing",
        label: "Processing",
        icon: StopwatchIcon,
    },
    {
        value: "shipped",
        label: "Shipped",
        icon: CircleIcon,
    },
    {
        value: "completed",
        label: "Completed",
        icon: CheckCircledIcon,
    },
    // {
    //     value: "canceled",
    //     label: "Canceled",
    //     icon: CrossCircledIcon,
    // },
];

const columns: ColumnDef<TOrder>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={value => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: ({ column }) => <ColumnHeader column={column} title="ID" />,
        cell: ({ row }) => (
            <Link
                className="hover:underline hover:underline-offset-2"
                href={`/dashboard/orders/${row.getValue("id")}`}
            >
                #{row.getValue("id")}
            </Link>
        ),
    },
    {
        accessorKey: "user",
        header: () => "User",
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span>
                    #{row.original.user_id} ({row.original.name || "N/A"})
                </span>
                <span>{row.original.email}</span>
            </div>
        ),
    },
    {
        accessorKey: "amount",
        header: ({ column }) => <ColumnHeader column={column} title="Amount" />,
        cell: ({ row }) => formatPrice(row.original.amount / 100),
    },
    {
        accessorKey: "payment",
        header: ({ column }) => <ColumnHeader column={column} title="Payment" />,
        cell: ({ row }) => row.original.payment,
    },
    {
        accessorKey: "status",
        header: ({ column }) => <ColumnHeader column={column} title="Status" />,
        cell: ({ row }) => {
            const status = statuses.find(status => status.value === row.getValue("status"));

            if (!status) {
                return null;
            }

            return (
                <div className="flex w-[100px] items-center">
                    {status.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                    <span>{status.label}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => <ColumnHeader column={column} title="CreatedAt" />,
        cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
        id: "actions",
        cell: ({ row }) => <RowActions row={row} />,
    },
];

export default columns;
