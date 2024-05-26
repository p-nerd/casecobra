import type { TID } from "@/types";
import type { Table, ColumnDef } from "@tanstack/react-table";
import { cn, isObjectEmpty } from "@/lib/utils";
import { router } from "@inertiajs/react";
import { useCallback, useState } from "react";
import { formatDate, formatPrice } from "@/lib/utils";
import { useChangeStatus, useDeleteOrder } from "@/hooks/dashboard/orders";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Container, Header } from "@/components/ui2/misc";
import {
    Table as UITable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Link } from "@inertiajs/react";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Cross2Icon,
    CheckIcon,
    PlusCircledIcon,
    DoubleArrowRightIcon,
    DotsHorizontalIcon,
    CaretSortIcon,
    ArrowDownIcon,
    ArrowUpIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
} from "@radix-ui/react-icons";
import {
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuItem,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import SiteLayout from "@/layouts/SiteLayout";
import url from "@/lib/url";
import { Form } from "@/components/ui2/form";
import { DeleteIcon } from "lucide-react";

const useNavigate = () => {
    return useCallback((href: string) => {
        router.get(href, {}, { preserveScroll: true });
    }, []);
};

const StatusFilter = (props: { title?: string; options: string[] }) => {
    const href = window.location.href;
    const status = url.getQueries(href)?.status;
    const selectedValues = new Set(status ? url.decode(status)?.split(",") || [] : []);

    const navigate = useNavigate();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed">
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    Status
                    {selectedValues?.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedValues.size}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValues.size} selected
                                    </Badge>
                                ) : (
                                    props.options
                                        .filter(option => selectedValues.has(option))
                                        .map(option => (
                                            <Badge
                                                variant="secondary"
                                                key={option}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.toUpperCase()}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={props.title} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {props.options.map(option => {
                                const isSelected = selectedValues.has(option);
                                return (
                                    <CommandItem
                                        key={option}
                                        onSelect={() => {
                                            if (isSelected) {
                                                selectedValues.delete(option);
                                            } else {
                                                selectedValues.add(option);
                                            }
                                            const filterValues = Array.from(selectedValues);
                                            navigate(
                                                url.replaceQueries(href, {
                                                    status: url.encode(filterValues.join(",")),
                                                }),
                                            );
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible",
                                            )}
                                        >
                                            <CheckIcon className={cn("h-4 w-4")} />
                                        </div>
                                        <span>{option.toUpperCase()}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() =>
                                            navigate(
                                                url.replaceQueries(href, {
                                                    status: undefined,
                                                }),
                                            )
                                        }
                                        className="justify-center text-center"
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

const Toolbar = ({
    statuses,
    selectedRows,
}: {
    statuses: string[];
    selectedRows: { [key: number]: boolean };
}) => {
    const href = window.location.href;
    const { status, id } = url.getQueries(href);
    const isFiltered = !!status || !!id;
    const navigate = useNavigate();

    const [search, setSearch] = useState(id || "");

    const handleDelete = useCallback(() => {
        console.log(selectedRows);
    }, [selectedRows]);

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Form
                    className="flex-row gap-2"
                    onSubmit={() => navigate(url.replaceQueries(href, { id: search }))}
                >
                    <Input
                        placeholder="Filter id..."
                        className="h-8 w-[150px] bg-white lg:w-[250px]"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <Button variant="outline" size="sm" className="h-8" type="submit">
                        Search
                    </Button>
                </Form>
                <StatusFilter options={statuses} />
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            navigate(
                                url.replaceQueries(href, {
                                    id: undefined,
                                    status: undefined,
                                    page: undefined,
                                }),
                            )
                        }
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            {!isObjectEmpty(selectedRows) && (
                <Button variant="outline" size="sm" className="h-8" onClick={handleDelete}>
                    <DeleteIcon className="mr-2 h-4 w-4" />
                    Delete Select Orders
                </Button>
            )}
        </div>
    );
};

const Pagination = <TData,>(props: {
    per_page: number;
    table: Table<TData>;
    total: number;
    from: number;
    to: number;
    last_page_url: string;
    first_page_url: string;
    prev_page_url: string | null;
    next_page_url: string | null;
    current_page: number;
    last_page: number;
}) => {
    const href = window.location.href;

    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                {props.table.getFilteredSelectedRowModel().rows.length} selected from {props.from}{" "}
                to {props.to} of {props.total} row(s).
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        value={`${props.per_page}`}
                        onValueChange={v => navigate(url.replaceQueries(href, { per_page: v }))}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={props.per_page} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 15, 20, 30, 40, 50].map(pageSize => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Page {props.current_page} of {props.last_page}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => navigate(props.first_page_url!)}
                        disabled={props.first_page_url === href}
                    >
                        <span className="sr-only">Go to first page</span>
                        <DoubleArrowLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => navigate(props.prev_page_url!)}
                        disabled={!props.prev_page_url}
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => navigate(props.next_page_url!)}
                        disabled={!props.next_page_url}
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => navigate(props.last_page_url!)}
                        disabled={props.last_page_url === href}
                    >
                        <span className="sr-only">Go to last page</span>
                        <DoubleArrowRightIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

const DataTable = <TData, TValue>({
    columns,
    data,
    statuses,
    pagiationData,
}: {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    statuses: string[];
    pagiationData: TPaginatedOrders;
}) => {
    const [rowSelection, setRowSelection] = useState<{ [key: number]: boolean }>({});

    const table = useReactTable({
        data,
        columns,
        state: { rowSelection },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="space-y-4">
            <Toolbar statuses={statuses} selectedRows={rowSelection} />
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
            <Pagination
                table={table}
                per_page={pagiationData.per_page}
                total={pagiationData.total}
                from={pagiationData.from}
                to={pagiationData.to}
                first_page_url={pagiationData.first_page_url}
                prev_page_url={pagiationData.prev_page_url}
                next_page_url={pagiationData.next_page_url}
                last_page_url={pagiationData.last_page_url}
                current_page={pagiationData.current_page}
                last_page={pagiationData.last_page}
            />
        </div>
    );
};

const ColumnSortableHeader = (props: { title: string; sortKey: string; className?: string }) => {
    const href = window.location.href;
    const { sort, order } = url.getQueries(href);

    const navigate = useNavigate();

    const sortKey = sort || "created_at";
    const orderKey = order || "desc";

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
                        {sortKey === props.sortKey && orderKey === "desc" ? (
                            <ArrowDownIcon className="ml-2 h-4 w-4" />
                        ) : sortKey === props.sortKey && orderKey === "asc" ? (
                            <ArrowUpIcon className="ml-2 h-4 w-4" />
                        ) : (
                            <CaretSortIcon className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem
                        onClick={() => {
                            navigate(
                                url.replaceQueries(href, {
                                    page: undefined,
                                    sort: props.sortKey,
                                    order: "asc",
                                }),
                            );
                        }}
                    >
                        <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            navigate(
                                url.replaceQueries(href, {
                                    page: undefined,
                                    sort: props.sortKey,
                                    order: "desc",
                                }),
                            );
                        }}
                    >
                        <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Desc
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

type TOrder = {
    id: TID;
    user_id: TID;
    name: string;
    email: string;
    amount: number;
    payment: string;
    status: string;
    createdAt: string;
    croppedImageUrl: string;
};

const columns = (statuses: string[]) => {
    const _columns: ColumnDef<TOrder>[] = [
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
            header: () => <ColumnSortableHeader title="ID" sortKey="id" />,
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
            header: () => <ColumnSortableHeader title="Amount" sortKey="amount" />,
            cell: ({ row }) => formatPrice(row.original.amount / 100),
        },
        {
            accessorKey: "payment",
            header: () => <ColumnSortableHeader title="Payment" sortKey="paid" />,
            cell: ({ row }) => row.original.payment,
        },
        {
            accessorKey: "status",
            header: () => <ColumnSortableHeader title="Status" sortKey="status" />,
            cell: ({ row }) => {
                const status = statuses.find(status => status === row.getValue("status"));
                if (!status) {
                    return null;
                }
                return status.toUpperCase();
            },
            filterFn: (row, id, value) => {
                return value.includes(row.getValue(id));
            },
        },
        {
            accessorKey: "createdAt",
            header: () => <ColumnSortableHeader title="CreatedAt" sortKey="created_at" />,
            cell: ({ row }) => formatDate(row.original.createdAt),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const handleDeleteOrder = useDeleteOrder();
                const handleChangeStatus = useChangeStatus();

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                            >
                                <DotsHorizontalIcon className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem
                                onClick={() =>
                                    router.get(
                                        route("dashboard.orders.show", { order: row.original.id }),
                                    )
                                }
                            >
                                Details
                            </DropdownMenuItem>
                            <a href={row.original.croppedImageUrl} target="_blank">
                                <DropdownMenuItem>Cropped Image</DropdownMenuItem>
                            </a>
                            <DropdownMenuSeparator />
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger className="px-2">
                                    Change Status
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent className="flex flex-col gap-2">
                                        {statuses.map(status => (
                                            <DropdownMenuItem
                                                key={status}
                                                onClick={() =>
                                                    handleChangeStatus(
                                                        status,
                                                        row.original.id as any,
                                                    )
                                                }
                                                className={cn({
                                                    "bg-primary text-white":
                                                        status === row.original.status,
                                                })}
                                            >
                                                <span>{status.toUpperCase()}</span>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => handleDeleteOrder(row.original.id as any)}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
    return _columns;
};

type TPaginatedOrders = {
    from: number;
    to: number;
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
    data: TOrder[];
    path: string;
    links: {
        url: string;
        label: string;
        actiive: boolean;
    }[];
    last_page_url: string;
    first_page_url: string;
    prev_page_url: string | null;
    next_page_url: string | null;
};

const Orders = (props: { orders: TPaginatedOrders; statuses: string[] }) => {
    return (
        <SiteLayout title="Manage Orders">
            <Container className="mx-auto space-y-6 py-12">
                <Header>Manage Orders</Header>
                <DataTable
                    data={props.orders.data}
                    columns={columns(props.statuses)}
                    statuses={props.statuses}
                    pagiationData={props.orders}
                />
            </Container>
        </SiteLayout>
    );
};

export default Orders;
