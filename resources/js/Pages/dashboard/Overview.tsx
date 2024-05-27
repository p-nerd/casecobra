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
import { Container, Header2, Section, Title } from "@/components/ui2/misc";
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
import { ReactNode } from "react";

const ProgressCard = (props: { title: string; sum: number; goal: number }) => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardDescription>{props.title}</CardDescription>
                <CardTitle className="text-4xl">{formatPrice(props.sum ?? 0)}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground">
                    of {formatPrice(props.goal)} goal
                </div>
            </CardContent>
            <CardFooter>
                <Progress value={((props.sum ?? 0) * 100) / props.goal} />
            </CardFooter>
        </Card>
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
};

type TStatistic = {
    sum: number;
    goal: number;
};

const Overview = (props: { orders: TOrder[]; lastWeek: TStatistic; lastMonth: TStatistic }) => {
    return (
        <Container className="gap-4">
            <div className="grid gap-4 lg:grid-cols-2">
                <ProgressCard
                    title="Last Week"
                    sum={props.lastWeek.sum}
                    goal={props.lastWeek.goal}
                />
                <ProgressCard
                    title="Last Month"
                    sum={props.lastMonth.sum}
                    goal={props.lastMonth.goal}
                />
            </div>
            <Header2>
                <Title>Last {props.orders?.length || 0} orders</Title>
            </Header2>
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
                                <TableHead></TableHead>
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
                                    <TableCell>
                                        <Link
                                            href={`/dashboard/orders/${order.id}`}
                                            className={buttonVariants({
                                                variant: "link",
                                                size: "sm",
                                            })}
                                        >
                                            View
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Section>
            )}
            <Section className="py-1 text-center">
                <Link href="/dashboard/orders" className={buttonVariants({ variant: "link" })}>
                    View all orders
                </Link>
            </Section>
        </Container>
    );
};

Overview.layout = (page: ReactNode) => <SiteLayout children={page} title="Overview" />;

export default Overview;
