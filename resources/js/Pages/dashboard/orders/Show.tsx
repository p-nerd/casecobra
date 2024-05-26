import type { TID } from "@/types";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { formatPrice, formatDate } from "@/lib/utils";
import { useChangeStatus, useDeleteOrder } from "@/hooks/dashboard/orders";

import { Button } from "@/components/ui/button";
import { Container, Phone } from "@/components/ui2/misc";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import SiteLayout from "@/layouts/SiteLayout";

const Section = (props: { title: string; children: ReactNode }) => {
    return (
        <div className="flex flex-col gap-2 border-b border-zinc-200 py-10">
            <p className="font-medium text-gray-900 underline underline-offset-4">{props.title}</p>
            <div className="mt-2 text-zinc-700">{props.children}</div>
        </div>
    );
};

const Item = (props: { label: string; value: string | ReactNode }) => {
    return (
        <div className="flex gap-1">
            <span className="w-[105px] font-semibold">{props.label}: </span>
            {props.value || "N/A"}
        </div>
    );
};

type TOrder = {
    id: TID;
    user_id: TID;
    status: string;
    amount: number;
    name: string;
    email: string;
    phone: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    originalImageKey: string;
    originalImageUrl: string;
    croppedImageKey: string;
    croppedImageUrl: string;
    color: {
        label: string;
        value: string;
    };
    modelLabel: string;
    materialLabel: string;
    finishLabel: string;
    paid: boolean;
    created_at: string;
    charge_id: string;
};

const ChangeStatus = ({
    orderId,
    statuses,
    status,
}: {
    orderId: TID;
    statuses: string[];
    status: string;
}) => {
    const [open, setOpen] = useState(false);

    const handleChangeStatus = useChangeStatus("show");

    return (
        <div className="flex gap-3 pt-3">
            <Button onClick={() => setOpen(!open)} className="min-w-[166px]">
                Change Order Status
            </Button>
            {open && (
                <Select
                    value={status}
                    onValueChange={status => handleChangeStatus(status, orderId)}
                >
                    <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {statuses.map((status, index) => (
                            <SelectItem value={status} key={index}>
                                {status.toUpperCase()}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        </div>
    );
};

const DeleteOrder = (props: { orderId: TID }) => {
    const handleDeleteOrder = useDeleteOrder();
    return (
        <Button
            variant="destructive"
            className="mt-2 min-w-[166px]"
            onClick={() => handleDeleteOrder(props.orderId)}
        >
            Delete The Order
        </Button>
    );
};

const Info = ({ order, statuses }: { order: TOrder; statuses: string[] }) => {
    return (
        <>
            <Section title="Order Details">
                <Item label="Id" value={`#${order.id}`} />
                <Item label="User" value={`#${order.user_id} (${order.name})`} />
                <Item label="Amount" value={formatPrice(order.amount / 100)} />
                <Item label="Payment" value={order.paid ? "Paid" : "Unpiad"} />
                <Item label="Status" value={order.status.toUpperCase()} />
                <Item label="Placed On" value={formatDate(order.created_at)} />
                <Item label="Charge Id" value={order.charge_id} />

                <ChangeStatus orderId={order.id} statuses={statuses} status={order.status} />
                <DeleteOrder orderId={order.id} />
            </Section>

            <Section title="Case Details">
                <Item label="Model" value={order.modelLabel} />
                <Item
                    label="Color"
                    value={
                        <div className="flex items-center gap-1">
                            <div
                                className="h-4 w-4 rounded-full"
                                style={{ backgroundColor: order.color.value }}
                            ></div>
                            {order.color.label}
                        </div>
                    }
                />
                <Item label="Material" value={order.materialLabel} />
                <Item label="Finish" value={order.finishLabel} />
                <Item
                    label="Original IMG"
                    value={
                        <a
                            target="_blank"
                            className="text-primary hover:underline"
                            href={order.originalImageUrl}
                        >
                            {order.originalImageKey}
                        </a>
                    }
                />
                <Item
                    label="Cropped IMG"
                    value={
                        <a
                            target="_blank"
                            className="text-primary hover:underline"
                            href={order.croppedImageUrl}
                        >
                            {order.croppedImageKey}
                        </a>
                    }
                />
            </Section>

            <Section title="Shipping address">
                <Item label="Name" value={order.name} />
                <Item label="Email" value={order.email} />
                <Item label="Phone" value={order.phone} />
                <Item label="Address 1" value={order.address_1} />
                <Item label="Address 2" value={order.address_2} />
                <Item label="City" value={order.city} />
                <Item label="State" value={order.state} />
                <Item label="Country" value={order.country} />
                <Item label="Zip" value={order.zip} />
            </Section>
        </>
    );
};

const Order = ({ order, statuses }: { order: TOrder; statuses: string[] }) => {
    return (
        <SiteLayout title={`Manage Order #${order.id}`}>
            <Container className="flex flex-1 flex-col text-sm lg:flex-row">
                <div className="w-full space-y-6 py-10 lg:w-2/5">
                    <h3 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                        {order.modelLabel} Case
                    </h3>
                    <div className="flex flex-col items-center">
                        <Phone
                            className={cn("max-w-[140px] lg:max-w-[260px]")}
                            imgSrc={order.croppedImageUrl}
                            style={{
                                backgroundColor: order.color.value,
                            }}
                        />
                    </div>
                </div>
                <div className="lg:w-3/5">
                    <Info order={order} statuses={statuses} />
                </div>
            </Container>
        </SiteLayout>
    );
};

export default Order;
