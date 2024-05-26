import { cn, formatDate, formatPrice } from "@/lib/utils";

import { Progress } from "@/components/ui/progress";
import {
    Card,
    CardTitle,
    CardFooter,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Container, Header, Section } from "@/components/ui2/misc";
import SiteLayout from "@/layouts/SiteLayout";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import type { TID } from "@/types";
import { Link } from "@inertiajs/react";
import { buttonVariants } from "@/components/ui/button";

type TOrder = {
    id: TID;
    user_id: TID;
    name: string;
    email: string;
    amount: number;
    payment: string;
    status: string;
    createdAt: string;
};

const LastXOrders = (props: { orders: TOrder[] }) => {
    return (
        <div className="space-y-2">
            <Header>Last {props.orders?.length || 0} orders</Header>
            {props.orders?.length > 0 && (
                <Section>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Payment</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>CreatedAt</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {props.orders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell>
                                        <Link
                                            className={cn(
                                                buttonVariants({ variant: "link" }),
                                                "px-0",
                                            )}
                                            href={`/dashboard/orders/${order.id}`}
                                        >
                                            #{order.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>
                                                #{order.user_id} ({order.name || "N/A"})
                                            </span>
                                            <span>{order.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{formatPrice(order.amount / 100)}</TableCell>
                                    <TableCell>{order.payment}</TableCell>
                                    <TableCell>{order.status.toUpperCase()}</TableCell>
                                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Section>
            )}
        </div>
    );
};

const Overview = (props: { orders: TOrder[] }) => {
    const lastWeekSum = 120;
    const lastMonthSum = 2000;
    const WEEKLY_GOAL = 500;
    const MONTHLY_GOAL = 2500;

    return (
        <SiteLayout title="Overview">
            <Container className="flex flex-col gap-4 py-5">
                <div className="grid gap-4 lg:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Last Week</CardDescription>
                            <CardTitle className="text-4xl">
                                {formatPrice(lastWeekSum ?? 0)}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">
                                of {formatPrice(WEEKLY_GOAL)} goal
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Progress value={((lastWeekSum ?? 0) * 100) / WEEKLY_GOAL} />
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardDescription>Last Month</CardDescription>
                            <CardTitle className="text-4xl">
                                {formatPrice(lastMonthSum ?? 0)}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">
                                of {formatPrice(MONTHLY_GOAL)} goal
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Progress value={((lastMonthSum ?? 0) * 100) / MONTHLY_GOAL} />
                        </CardFooter>
                    </Card>
                </div>
                <LastXOrders orders={props.orders} />
            </Container>
        </SiteLayout>
    );
};

export default Overview;
