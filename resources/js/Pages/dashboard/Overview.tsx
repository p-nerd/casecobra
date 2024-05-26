import { formatPrice } from "@/lib/utils";

import { Progress } from "@/components/ui/progress";
import {
    Card,
    CardTitle,
    CardFooter,
    CardHeader,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Container, Header } from "@/components/ui2/misc";
import SiteLayout from "@/layouts/SiteLayout";

const LastXOrders = () => {
    return (
        <div>
            <Header>Last x orders</Header>
        </div>
    );
};

const Overview = () => {
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
                <LastXOrders />
            </Container>
        </SiteLayout>
    );
};

export default Overview;
