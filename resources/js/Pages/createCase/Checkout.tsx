import type { TImage } from "@/types/createCase";
import type { TID, TProps } from "@/types";

import { cn } from "@/lib/utils";
import { loadStripe } from "@stripe/stripe-js";

import { Phone } from "@/components/ui2/misc";
import { Container } from "@/components/ui2/misc";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";

import Layout from "@/layouts/Layout";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const EmbeddedForm = (props: { clientSecret: string }) => {
    return (
        <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret: props.clientSecret }}
        >
            <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
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
    clientSecret: string;
}>;

const Checkout = (p: TPreviewProps) => {
    return (
        <Layout title="checkout">
            <Container className="flex flex-1 flex-col text-sm lg:flex-row">
                <div className="my-10 w-full space-y-6 lg:w-2/5">
                    <h3 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                        {p.model.label} Case
                    </h3>
                    <div className="flex flex-col items-center">
                        <Phone
                            className={cn("max-w-[140px] lg:max-w-[260px]")}
                            imgSrc={p.croppedImage.url}
                            style={{
                                backgroundColor: p.color.value,
                            }}
                        />
                    </div>
                </div>
                <ScrollArea className="h-[42.7rem] flex-1 overflow-auto bg-white px-6 py-2 text-base lg:w-3/5 lg:px-8">
                    <EmbeddedForm clientSecret={p.clientSecret} />
                </ScrollArea>
            </Container>
        </Layout>
    );
};

export default Checkout;
