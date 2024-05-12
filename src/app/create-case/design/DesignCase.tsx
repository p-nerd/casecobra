"use client";

import { cn } from "@/lib/utils";

const DesignCase = (p: { imageUrl: string; imageDimention: { height: number; width: number } }) => {
    return (
        <div className="relative mb-20 mt-20 grid grid-cols-3 pb-20">
            <div
                className={cn(
                    "border-gay-300 relative col-span-2 flex h-[37.5rem]",
                    "w-full max-w-4xl items-center justify-center overflow-hidden",
                    "rounded-lg border-2 border-dashed p-12 text-center",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                )}
            ></div>
        </div>
    );
};

export default DesignCase;
