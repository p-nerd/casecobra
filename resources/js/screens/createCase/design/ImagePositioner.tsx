import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

import { Rnd } from "react-rnd";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import images from "@/lib/images";
import useCreateCaseDesign from "@/states/useCreateCaseDesign";

const ResizeHandleIcon = () => {
    return (
        <div
            className={cn(
                "h-5 w-5 rounded-full border border-zinc-200 bg-white",
                "shadow transition hover:bg-primary",
            )}
        />
    );
};

const base64ToBlob = (base64: string, mimeType: string) => {
    const base64Data = base64.split(",")[1];

    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
};

export const useCropImage = (image: TImage) => {
    const [renderedDimension, setRenderedDimension] = useState({
        width: image.width / 4,
        height: image.height / 4,
    });

    const [renderedPosition, setRenderedPosition] = useState({
        x: 10,
        y: 30,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const phoneCaseRef = useRef<HTMLDivElement>(null);

    const crop = async () => {
        const { left: containerLeft, top: containerTop } =
            containerRef.current!.getBoundingClientRect();
        const {
            left: caseLeft,
            top: caseTop,
            width: caseWidth,
            height: caseHeight,
        } = phoneCaseRef.current!.getBoundingClientRect();

        const leftOffset = caseLeft - containerLeft;
        const topOffset = caseTop - containerTop;

        const actualX = renderedPosition.x - leftOffset;
        const actualY = renderedPosition.y - topOffset;

        const canvas = document.createElement("canvas");

        canvas.width = caseWidth;
        canvas.height = caseHeight;

        const ctx = canvas.getContext("2d");

        const originalImage = new Image();
        originalImage.crossOrigin = "anonymous";
        originalImage.src = image.url;

        // waiting for image loading
        await new Promise(resolve => (originalImage.onload = resolve));

        ctx?.drawImage(
            originalImage,
            actualX,
            actualY,
            renderedDimension.width,
            renderedDimension.height,
        );

        const base64 = canvas.toDataURL();

        const blob = base64ToBlob(base64, "image/png");
        return new File([blob], "filename.png", { type: "image/png" });
    };

    return {
        containerRef,
        phoneCaseRef,
        setDimension: setRenderedDimension,
        setPosition: setRenderedPosition,
        crop,
    };
};

export type TImage = { url: string; height: number; width: number };

const ImagePositioner = (p: { image: TImage; cropImage: ReturnType<typeof useCropImage> }) => {
    const { color } = useCreateCaseDesign();

    return (
        <div
            ref={p.cropImage.containerRef}
            className={cn(
                "relative col-span-2 flex h-[37.5rem] w-full max-w-4xl",
                "items-center justify-center overflow-hidden rounded-lg",
                "border-2 border-dashed border-gray-300 p-12 text-center",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            )}
        >
            <div className="pointer-events-none relative aspect-[896/1831] w-60 bg-opacity-50">
                <AspectRatio
                    ref={p.cropImage.phoneCaseRef}
                    ratio={896 / 1831}
                    className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
                >
                    <img
                        alt="phone image"
                        src={images.phoneTemplate}
                        className="pointer-events-none z-50 select-none"
                    />
                </AspectRatio>
                <div
                    className={cn(
                        "absolute inset-0 bottom-px left-[3px] right-[3px] top-px",
                        "z-40 rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]",
                    )}
                />
                <div
                    className={cn(
                        "absolute inset-0 bottom-px left-[3px] right-[3px] top-px",
                        `bg- rounded-[32px]`,
                    )}
                    style={{ backgroundColor: color?.value }}
                />
            </div>
            <Rnd
                default={{
                    x: 10,
                    y: 30,
                    width: p.image.width / 4,
                    height: p.image.height / 4,
                }}
                lockAspectRatio={true}
                resizeHandleComponent={{
                    bottomRight: <ResizeHandleIcon />,
                    bottomLeft: <ResizeHandleIcon />,
                    topRight: <ResizeHandleIcon />,
                    topLeft: <ResizeHandleIcon />,
                }}
                onResizeStop={(_, __, ref, ___, { x, y }) => {
                    p.cropImage.setDimension({
                        width: parseInt(ref.style.width.slice(0, -2)),
                        height: parseInt(ref.style.height.slice(0, -2)),
                    });
                    p.cropImage.setPosition({ x, y });
                }}
                onDrag={(_, { x, y }) => {
                    p.cropImage.setPosition({ x, y });
                }}
                className="absolute z-20 border-[3px] border-primary"
            >
                <div className="relative h-full w-full">
                    <img src={p.image.url} alt="your image" className="pointer-events-none" />
                </div>
            </Rnd>
        </div>
    );
};

export default ImagePositioner;
