import type { TProps } from "@/types";
import type { TImage } from "@/types/createCase";
import type { Dispatch, SetStateAction } from "react";

import { useState } from "react";
import { cn, formatPrice, calculatePrice } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { router, usePage } from "@inertiajs/react";

import { Link } from "@inertiajs/react";
import { Phone } from "@/components/ui2/misc";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog";

import toast from "@/lib/toast";
import images from "@/lib/images";

import CreateCaseLayout from "@/layouts/CreateCaseLayout";

const LoginModal = ({
    caseDesignId,
    isOpen,
    setIsOpen,
}: {
    caseDesignId: number;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogContent className="absolute z-[9999999]">
                <DialogHeader>
                    <div className="relative mx-auto mb-10 h-24 w-24">
                        <img src={images.snake1} alt="snake image" className="object-contain" />
                    </div>
                    <DialogTitle className="text-center text-3xl font-bold tracking-tight text-gray-900">
                        Log in to continue
                    </DialogTitle>
                    <DialogDescription className="py-2 text-center text-base">
                        <span className="font-medium text-zinc-900">Your design was saved!</span>{" "}
                        Please login or create an account to complete your purchase.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
                    <Link
                        className={buttonVariants({ variant: "outline" })}
                        href={`/login?to=/create-case/preview?id=${caseDesignId}`}
                    >
                        Login
                    </Link>
                    <Link
                        className={buttonVariants({ variant: "default" })}
                        href={`/register?to=/create-case/preview?id=${caseDesignId}`}
                    >
                        Sign up
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
