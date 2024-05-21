import type { TID } from "@/types";

import { formatPrice } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { Link } from "@inertiajs/react";
import { PhonePreview } from "@/components/ui2/phones";

import SiteLayout from "@/layouts/SiteLayout";

const Order = (props: {
    order: {
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
}) => {
    return (
        <SiteLayout title={`Order #${props.order.id}`}>
            <div className="bg-white">
                <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                    <div className="max-w-xl">
                        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                            Order is{" "}
                            <span className="font-semibold text-primary">
                                {props.order.status.toUpperCase()}
                            </span>
                        </h1>
                        <div className="mt-12 text-sm font-medium">
                            <p className="text-zinc-900">Order number</p>
                            <p className="mt-2 text-zinc-500">#{props.order.id}</p>
                        </div>
                    </div>

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
                                            <span className="font-medium text-gray-900">
                                                Model:{" "}
                                            </span>
                                            {props.order.modelLabel}
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-900">
                                                Material:{" "}
                                            </span>
                                            {props.order.materialLabel}
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-900">
                                                Finish:{" "}
                                            </span>
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
                                <p className="mt-2 text-zinc-700">
                                    DHL, takes up to 3 working days
                                </p>
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
                </div>
            </div>
        </SiteLayout>
    );
};

export default Order;
