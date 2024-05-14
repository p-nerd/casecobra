"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Checkout = () => {
    return (
        <Button onClick={() => {}} className="px-4 sm:px-6 lg:px-8">
            Checkout <ArrowRight className="ml-1.5 inline h-4 w-4" />
        </Button>
    );
};

export default Checkout;
