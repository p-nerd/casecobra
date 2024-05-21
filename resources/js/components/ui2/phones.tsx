import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";

import images from "@/lib/images";

export const PhonePreview = ({
    imageUrl,
    color,
}: {
    imageUrl: string;
    color: { value: string };
}) => {
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
                        "phone-skew relative z-20 rounded-b-[10px] rounded-t-[15px] lg:rounded-b-[20px] lg:rounded-t-[30px]",
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
