"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { createCheckoutSession } from "./actions";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Checkout = (props: { createCaseId: string }) => {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleCheckout = async () => {
        try {
            setLoading(true);
            const { url } = await createCheckoutSession({ createCaseId: props.createCaseId });
            if (!url) {
                throw new Error("Unable to retrieve payment url");
            }
            router.push(url);
        } catch (e: any) {
            console.log(e);
            toast.error("Something went wrong on checkout", {
                description: e?.message || "",
            });
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button isLoading={loading} onClick={handleCheckout} className="px-4 sm:px-6 lg:px-8">
            Checkout <ArrowRight className="ml-1.5 inline h-4 w-4" />
        </Button>
    );
};

export default Checkout;
