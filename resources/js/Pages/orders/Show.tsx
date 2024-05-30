import { TProps, type TID } from "@/types";

import { formatPrice } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

import { Link, usePage } from "@inertiajs/react";
import { Progress } from "@/components/ui/progress";
import { PhonePreview } from "@/components/ui2/phones";
import { Container, Section, Title } from "@/components/ui2/parts";

import SiteLayout from "@/layouts/SiteLayout";

type TOrder = {
    id: TID;
    status: string;
    amount: number;
    name: string;
    address_1: string;
    address_2: string;
    zip: string;
    city: string;
    croppedImageUrl: string;
    colorValue: string;
    modelLabel: string;
    materialLabel: string;
    finishLabel: string;
};

const Order = (props: { order: TOrder; statues: string[] }) => {
    const foundIndex = props.statues.indexOf(props.order.status);
    const orderProgressValue =
        props.statues.length === foundIndex + 1
            ? 100
            : foundIndex === 0
              ? 0
              : (100 / props.statues.length) * foundIndex + 100 / props.statues.length / 2;

    return (
        <SiteLayout title={`Order #${props.order.id}`}>
            <Container className="max-w-4xl">
                <Section className="flex flex-col gap-3">
                    <Title>Order ID #{props.order.id}</Title>
                    <div className="flex flex-col">
                        <Progress value={orderProgressValue} />
                        <div className="flex">
                            {props.statues.map((status, index) => (
                                <div
                                    key={index}
                                    style={{
                                        width: `${100 / props.statues?.length}%`,
                                        textAlign:
                                            index === 0
                                                ? "start"
                                                : index === props.statues.length - 1
                                                  ? "end"
                                                  : "center",
                                    }}
                                >
                                    {status.toUpperCase()}
                                </div>
                            ))}
                        </div>
                    </div>
                </Section>

                <div className="mt-4 flex space-x-6 overflow-hidden rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
                    <PhonePreview
                        imageUrl={props.order.croppedImageUrl}
                        color={{ value: props.order.colorValue }}
                    />
                </div>

                <div>
                    <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
                        <div>
                            <p className="font-medium text-gray-900">Shipping address</p>
                            <div className="mt-2 text-zinc-700">
                                <address className="not-italic">
                                    <span className="block">{props.order.name}</span>
                                    <span className="block">{props.order.address_1}</span>
                                    <span className="block">{props.order.address_2}</span>
                                    <span className="block">
                                        {props.order.zip} {props.order.city}
                                    </span>
                                </address>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="mt-2 text-zinc-700">
                                <div className="not-italic">
                                    <div>
                                        <span className="font-medium text-gray-900">Model: </span>
                                        {props.order.modelLabel}
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-900">
                                            Material:{" "}
                                        </span>
                                        {props.order.materialLabel}
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-900">Finish: </span>
                                        {props.order.finishLabel}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
                        <div>
                            <p className="font-medium text-zinc-900">Payment status</p>
                            <p className="mt-2 text-zinc-700">Paid</p>
                        </div>

                        <div>
                            <p className="font-medium text-zinc-900">Shipping Method</p>
                            <p className="mt-2 text-zinc-700">DHL, takes up to 3 working days</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm">
                    <div className="flex justify-between">
                        <p className="font-medium text-zinc-900">Subtotal</p>
                        <p className="text-zinc-700">{formatPrice(props.order.amount / 100)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium text-zinc-900">Shipping</p>
                        <p className="text-zinc-700">{formatPrice(0)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium text-zinc-900">Total</p>
                        <p className="text-zinc-700">{formatPrice(props.order.amount / 100)}</p>
                    </div>
                </div>
                <div className="mt-10 flex flex-col items-center justify-center">
                    <Link
                        href="/orders"
                        className={buttonVariants({
                            size: "lg",
                        })}
                    >
                        See your all yours orders
                    </Link>
                </div>
            </Container>
        </SiteLayout>
    );
};

export default Order;
