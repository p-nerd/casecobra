import { formatPrice } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import useCreateCaseDesign, { calculatePrice } from "@/states/useCreateCaseDesign";

const PriceAndContinue = (p: { basePrice: number; onContinue: () => void; loading: boolean }) => {
    const { finish, material } = useCreateCaseDesign();

    return (
        <div className="h-16 w-full bg-white px-8">
            <div className="h-px w-full bg-zinc-200" />
            <div className="flex h-full w-full items-center justify-end">
                <div className="flex w-full items-center gap-6">
                    <p className="whitespace-nowrap font-medium">
                        {formatPrice(calculatePrice(p.basePrice, material, finish))}
                    </p>
                    <Button
                        onClick={p.onContinue}
                        loadingText="Saving"
                        size="sm"
                        className="w-full"
                        isLoading={p.loading}
                    >
                        Continue
                        <ArrowRight className="ml-1.5 inline h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PriceAndContinue;
