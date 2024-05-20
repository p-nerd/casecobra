import type { TProps } from "@/types";
import type { TImage } from "@/types/createCase";

import { cn } from "@/lib/utils";
import { loadStripe } from "@stripe/stripe-js";

import { Phone } from "@/components/ui2/misc";
import { Container } from "@/components/ui2/misc";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";

import SiteLayout from "@/layouts/SiteLayout";

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
    croppedImage: TImage;
    color: { value: string };
    model: { label: string };
    clientSecret: string;
}>;

const Checkout = (p: TPreviewProps) => {
    return (
        <SiteLayout title="Checkout Phone Case">
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
                <ScrollArea className="h-[42.7rem] bg-white lg:w-3/5">
                    <EmbeddedForm clientSecret={p.clientSecret} />
                </ScrollArea>
            </Container>
        </SiteLayout>
    );
};

export default Checkout;
