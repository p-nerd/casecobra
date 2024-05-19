import type { TID } from "@/types";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "@inertiajs/react";

import images from "@/lib/images";

import SiteLayout from "@/layouts/SiteLayout";

const PhonePreview = ({ imageUrl, color }: { imageUrl: string; color: { value: string } }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [renderedDimensions, setRenderedDimensions] = useState({
        height: 0,
        width: 0,
    });

    const handleResize = () => {
        if (!ref.current) return;
        const { width, height } = ref.current.getBoundingClientRect();
        setRenderedDimensions({ width, height });
    };

    useEffect(() => {
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [ref.current]);

    return (
        <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
            <div
                className="absolute z-20 scale-[1.0352]"
                style={{
                    left: renderedDimensions.width / 2 - renderedDimensions.width / (1216 / 121),
                    top: renderedDimensions.height / 6.22,
                }}
            >
                <img
                    width={renderedDimensions.width / (3000 / 637)}
                    className={cn(
                        "phone-skew relative z-20 rounded-b-[10px] rounded-t-[15px] md:rounded-b-[20px] md:rounded-t-[30px]",
                    )}
                    src={imageUrl}
                    style={{
                        backgroundColor: color.value,
                    }}
                />
            </div>

            <div className="relative z-40 h-full w-full">
                <img
                    alt="phone"
                    src={images.clearphone}
                    className="pointer-events-none h-full w-full rounded-md antialiased"
                />
            </div>
        </AspectRatio>
    );
};

type TImage = {
    url: string;
};

type TColor = {
    value: string;
};

type TOrder = {
    id: TID;
    amount: number;
    name: string;
    address_1: string;
    zip: string;
    city: string;
};

const ThankYou = (props: {
    successful?: boolean;
    checkoutUrl?: string;
    croppedImage: TImage;
    color: TColor;
    order: TOrder;
}) => {
    return (
        <SiteLayout title="Thank You">
            {!props.successful ? (
                <div className="mt-24 flex w-full justify-center">
                    <div className="flex flex-col items-center gap-2">
                        <h3 className="text-xl font-semibold">Your payment is unsuccessful...</h3>
                        <p>
                            Try to pay again{" "}
                            <Link
                                className={buttonVariants({
                                    variant: "link",
                                    className: "px-0",
                                })}
                                href={props.checkoutUrl!}
                            >
                                here
                            </Link>
                        </p>
                    </div>
                </div>
            ) : (
                <div className="bg-white">
                    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                        <div className="max-w-xl">
                            <p className="text-base font-medium text-primary">Thank you!</p>
                            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                                Your case is on the way!
                            </h1>
                            <p className="mt-2 text-base text-zinc-500">
                                We've received your order and are now processing it.
                            </p>

                            <div className="mt-12 text-sm font-medium">
                                <p className="text-zinc-900">Order number</p>
                                <p className="mt-2 text-zinc-500">{props.order.id}</p>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-zinc-200">
                            <div className="mt-10 flex flex-auto flex-col">
                                <h4 className="font-semibold text-zinc-900">
                                    You made a great choice!
                                </h4>
                                <p className="mt-2 text-sm text-zinc-600">
                                    We at CaseCobra believe that a phone case doesn't only need to
                                    look good, but also last you for the years to come. We offer a
                                    5-year print guarantee: If you case isn't of the highest
                                    quality, we'll replace it for free.
                                </p>
                            </div>
                        </div>

                        <div className="mt-4 flex space-x-6 overflow-hidden rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
                            <PhonePreview imageUrl={props.croppedImage.url} color={props.color} />
                        </div>

                        <div>
                            <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
                                <div>
                                    <p className="font-medium text-gray-900">Shipping address</p>
                                    <div className="mt-2 text-zinc-700">
                                        <address className="not-italic">
                                            <span className="block">{props.order.name}</span>
                                            <span className="block">{props.order.address_1}</span>
                                            <span className="block">
                                                {props.order.zip} {props.order.city}
                                            </span>
                                        </address>
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
                                <p className="text-zinc-700">
                                    {formatPrice(props.order.amount / 100)}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-medium text-zinc-900">Shipping</p>
                                <p className="text-zinc-700">{formatPrice(0)}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-medium text-zinc-900">Total</p>
                                <p className="text-zinc-700">
                                    {formatPrice(props.order.amount / 100)}
                                </p>
                            </div>
                        </div>
                        <div className="mt-10 flex flex-col items-center justify-center">
                            <Link
                                href="/profile/orders"
                                className={buttonVariants({
                                    size: "lg",
                                })}
                            >
                                See your all orders
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </SiteLayout>
    );
};

export default ThankYou;
