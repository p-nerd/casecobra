import { formatPrice } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { Link } from "@inertiajs/react";
import { Container, Header, Phone, Section } from "@/components/ui2/misc";

import SiteLayout from "@/layouts/SiteLayout";
import { ArrowRight } from "lucide-react";

type TOrder = {
    id: string;
    status: string;
    amount: number;
    croppedImageUrl: string;
    colorValue: string;
    modelLabel: string;
    materialLabel: string;
    finishLabel: string;
};

const Item = (props: { label: string; value: string }) => {
    return (
        <div>
            <span className="font-semibold">{props.label}</span>: {props.value}
        </div>
    );
};

const Orders = (props: { orders: TOrder[] }) => {
    return (
        <SiteLayout title={`Orders (${props.orders?.length || 0})`}>
            <Container className="py-12">
                <div className="mx-auto space-y-6">
                    <Header>Your Orders ({props.orders?.length || 0})</Header>
                    <div className="grid gap-5 lg:grid-cols-2">
                        {props.orders.map(order => (
                            <Section className="flex items-center gap-5 py-4">
                                <Phone
                                    className="w-[120px] lg:w-[150px]"
                                    style={{ backgroundColor: order.colorValue }}
                                    imgSrc={order.croppedImageUrl}
                                />
                                <div className="space-y-4 ">
                                    <div className="space-y-1">
                                        <Item label="ID" value={`#${order.id}`} />
                                        <Item label="Model" value={order.modelLabel} />
                                        <Item label="Material" value={order.materialLabel} />
                                        <Item label="Finish" value={order.finishLabel} />
                                        <Item
                                            label="Total"
                                            value={formatPrice(order.amount / 100)}
                                        />
                                        <Item label="Status" value={order.status.toUpperCase()} />
                                    </div>
                                    <Link href={`/orders/${order.id}`} className={buttonVariants()}>
                                        Track the order
                                        <ArrowRight className="ml-1.5 h-5 w-5" />
                                    </Link>
                                </div>
                            </Section>
                        ))}
                    </div>
                </div>
            </Container>
        </SiteLayout>
    );
};

export default Orders;
