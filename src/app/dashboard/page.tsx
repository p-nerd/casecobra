import { db } from "@/db";
import { notFound } from "next/navigation";
import { getIsAdmin } from "@/lib/auth";
import { formatPrice } from "@/lib/utils";

import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell } from "@/components/ui/table";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

import StatusDropdown from "./StatusDropdown";

const getUserById = async (_: string) => {
    return { preferred_email: "shihabx@gmail.com" };
};

const Dashboard = async () => {
    const isAdmin = await getIsAdmin();

    if (!isAdmin) {
        return notFound();
    }

    const orders = await db.order.findMany({
        where: {
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 7)),
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            ShippingAddress: true,
        },
    });

    const lastWeekSum = await db.order.aggregate({
        where: {
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 7)),
            },
        },
        _sum: {
            amount: true,
        },
    });

    const lastMonthSum = await db.order.aggregate({
        where: {
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 30)),
            },
        },
        _sum: {
            amount: true,
        },
    });

    const WEEKLY_GOAL = 500;
    const MONTHLY_GOAL = 2500;

    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <div className="mx-auto flex w-full max-w-7xl flex-col sm:gap-4 sm:py-4">
                <div className="flex flex-col gap-16">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Last Week</CardDescription>
                                <CardTitle className="text-4xl">
                                    {formatPrice(lastWeekSum._sum.amount ?? 0)}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    of {formatPrice(WEEKLY_GOAL)} goal
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Progress
                                    value={((lastWeekSum._sum.amount ?? 0) * 100) / WEEKLY_GOAL}
                                />
                            </CardFooter>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardDescription>Last Month</CardDescription>
                                <CardTitle className="text-4xl">
                                    {formatPrice(lastMonthSum._sum.amount ?? 0)}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground">
                                    of {formatPrice(MONTHLY_GOAL)} goal
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Progress
                                    value={((lastMonthSum._sum.amount ?? 0) * 100) / MONTHLY_GOAL}
                                />
                            </CardFooter>
                        </Card>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight">Incoming orders</h1>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden sm:table-cell">Status</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Purchase date
                                </TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {orders.map(async order => (
                                <TableRow key={order.id} className="bg-accent">
                                    <TableCell>
                                        <div className="font-medium">
                                            {order.ShippingAddress?.name}
                                        </div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            {(await getUserById(order.userId)).preferred_email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <StatusDropdown id={order.id} orderStatus={order.status} />
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {order.createdAt.toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatPrice(order.amount)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
