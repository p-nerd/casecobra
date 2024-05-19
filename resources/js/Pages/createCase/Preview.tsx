import type { TID, TProps } from "@/types";
import type { TImage } from "@/types/createCase";

import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { cn, formatPrice, calculatePrice } from "@/lib/utils";

import { Phone } from "@/components/ui2/misc";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

import toast from "@/lib/toast";

import LoginModal from "@/components/createCase/LoginModal";
import CreateCaseLayout from "@/layouts/CreateCaseLayout";

const Checkout = (props: { orderId: number }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState<boolean>(false);

    const page = usePage<TProps>();

    const handleCheckout = async () => {
        if (!page.props.auth?.user?.id) {
            setOpen(true);
            return;
        }

        try {
            setLoading(true);
            router.post(
                "/create-case/preview",
                {
                    orderId: props.orderId,
                },
                {
                    onError: e => {
                        toast.error(e?.message);

                        if (e?.to) {
                            setTimeout(() => {
                                router.get(e.to, undefined, { replace: true });
                            }, 1000);
                        }
                    },
                },
            );
        } catch (e: any) {
            console.log(e);
            toast.error("Something went wrong on checkout", {
                description: e?.message || "",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <LoginModal orderId={props.orderId} isOpen={open} setIsOpen={setOpen} />
            <Button isLoading={loading} onClick={handleCheckout} className="px-4 sm:px-6 lg:px-8">
                Checkout <ArrowRight className="ml-1.5 inline h-4 w-4" />
            </Button>
        </>
    );
};

type TPreviewProps = TProps<{
    orderId: TID;
    originalImage: TImage;
    croppedImage: TImage;
    color: { value: string };
    model: { label: string };
    material: { label: string; price: number };
    finish: { label: string; price: number };
    basePrice: number;
}>;

const Preview = (p: TPreviewProps) => {
    return (
        <CreateCaseLayout title="Your case summery">
            <div className="mt-20 flex flex-col items-center text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:grid md:gap-x-8 lg:gap-x-12">
                <div className="md:col-span-4 md:row-span-2 md:row-end-2 lg:col-span-3">
                    <Phone
                        className={cn("max-w-[150px] md:max-w-full")}
                        imgSrc={p.croppedImage.url}
                        style={{
                            backgroundColor: p.color.value,
                        }}
                    />
                </div>

                <div className="mt-6 sm:col-span-9 md:row-end-1">
                    <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                        Your {p.model.label} Case
                    </h3>
                    <div className="mt-3 flex items-center gap-1.5 text-base">
                        <Check className="h-4 w-4 text-green-500" />
                        In stock and ready to ship
                    </div>
                </div>

                <div className="text-base sm:col-span-12 md:col-span-9">
                    <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                        <div>
                            <p className="font-medium text-zinc-950">Highlights</p>
                            <ol className="mt-3 list-inside list-disc text-zinc-700">
                                <li>Wireless charging compatible</li>
                                <li>TPU shock absorption</li>
                                <li>Packaging made from recycled materials</li>
                                <li>5 year print warranty</li>
                            </ol>
                        </div>
                        <div>
                            <p className="font-medium text-zinc-950">Materials</p>
                            <ol className="mt-3 list-inside list-disc text-zinc-700">
                                <li>High-quality, durable material</li>
                                <li>Scratch- and fingerprint resistant coating</li>
                            </ol>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
                            <div className="flow-root text-sm">
                                <div className="mt-2 flex items-center justify-between py-1">
                                    <p className="text-gray-600">Base price</p>
                                    <p className="font-medium text-gray-900">
                                        {formatPrice(p.basePrice / 100)}
                                    </p>
                                </div>

                                <div className="mt-2 flex items-center justify-between py-1">
                                    <p className="text-gray-600">{p.material.label} Material</p>
                                    <p className="font-medium text-gray-900">
                                        {formatPrice(p.material.price / 100)}
                                    </p>
                                </div>

                                <div className="mt-2 flex items-center justify-between py-1">
                                    <p className="text-gray-600">{p.finish.label} Finish</p>
                                    <p className="font-medium text-gray-900">
                                        {formatPrice(p.finish.price / 100)}
                                    </p>
                                </div>

                                <div className="my-2 h-px bg-gray-200" />

                                <div className="flex items-center justify-between py-2">
                                    <p className="font-semibold text-gray-900">Order total</p>
                                    <p className="font-semibold text-gray-900">
                                        {formatPrice(
                                            calculatePrice(p.basePrice, p.material, p.finish),
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end pb-12">
                            <Checkout orderId={p.orderId} />
                        </div>
                    </div>
                </div>
            </div>
        </CreateCaseLayout>
    );
};

export default Preview;
