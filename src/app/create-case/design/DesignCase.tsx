"use client";

import NextImage from "next/image";
import useOptions from "./useOptions";

import { toast } from "sonner";
import { cn, formatPrice } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { BASE_PRICE, COLORS, FINISHES, MATERIALS, MODELS } from "./useOptions";
import { updateCreateCase } from "./actions";
import { useRouter } from "next/navigation";

import { Rnd } from "react-rnd";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup } from "@headlessui/react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dispatch, RefObject, SetStateAction, useRef, useState } from "react";

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

type TDimension = {
    height: number;
    width: number;
};

type TPosition = {
    x: number;
    y: number;
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

const useCropImage = (imageUrl: string, imageDimension: TDimension) => {
    const [renderedDimension, setRenderedDimension] = useState({
        width: imageDimension.width / 4,
        height: imageDimension.height / 4,
    });

    const [renderedPosition, setRenderedPosition] = useState({
        x: 10,
        y: 30,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const phoneCaseRef = useRef<HTMLDivElement>(null);

    const cropImage = async () => {
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
        originalImage.src = imageUrl;

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
        const file = new File([blob], "filename.png", { type: "image/png" });
        return file;
    };

    return {
        containerRef,
        phoneCaseRef,
        setRenderedDimension,
        setRenderedPosition,
        cropImage,
    };
};

const ImagePositioner = (p: {
    imageUrl: string;
    imageDimension: TDimension;
    containerRef: RefObject<HTMLDivElement>;
    phoneCaseRef: RefObject<HTMLDivElement>;
    setRenderedDimension: Dispatch<SetStateAction<TDimension>>;
    setRenderedPosition: Dispatch<SetStateAction<TPosition>>;
}) => {
    const { color } = useOptions();

    return (
        <div
            ref={p.containerRef}
            className={cn(
                "relative col-span-2 flex h-[37.5rem] w-full max-w-4xl",
                "items-center justify-center overflow-hidden rounded-lg",
                "border-2 border-dashed border-gray-300 p-12 text-center",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            )}
        >
            <div className="pointer-events-none relative aspect-[896/1831] w-60 bg-opacity-50">
                <AspectRatio
                    ref={p.phoneCaseRef}
                    ratio={896 / 1831}
                    className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
                >
                    <NextImage
                        fill
                        alt="phone image"
                        src="/phone-template.png"
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
                        `rounded-[32px] bg-${color.tw}`,
                    )}
                />
            </div>
            <Rnd
                default={{
                    x: 10,
                    y: 30,
                    width: p.imageDimension.width / 4,
                    height: p.imageDimension.height / 4,
                }}
                lockAspectRatio={true}
                resizeHandleComponent={{
                    bottomRight: <ResizeHandleIcon />,
                    bottomLeft: <ResizeHandleIcon />,
                    topRight: <ResizeHandleIcon />,
                    topLeft: <ResizeHandleIcon />,
                }}
                onResizeStop={(_, __, ref, ___, { x, y }) => {
                    p.setRenderedDimension({
                        width: parseInt(ref.style.width.slice(0, -2)),
                        height: parseInt(ref.style.height.slice(0, -2)),
                    });
                    p.setRenderedPosition({ x, y });
                }}
                onDrag={(_, { x, y }) => {
                    p.setRenderedPosition({ x, y });
                }}
                className="absolute z-20 border-[3px] border-primary"
            >
                <div className="relative h-full w-full">
                    <NextImage
                        src={p.imageUrl}
                        fill
                        alt="your image"
                        className="pointer-events-none"
                    />
                </div>
            </Rnd>
        </div>
    );
};

const SelectColor = () => {
    const { color, setColor } = useOptions();

    return (
        <RadioGroup value={color} onChange={color => setColor(color)}>
            <Label>Color: {color.label}</Label>
            <div className="mt-3 flex items-center space-x-3">
                {COLORS.map(color => (
                    <RadioGroup.Option
                        key={color.label}
                        value={color}
                        className={({ active, checked }) =>
                            cn(
                                "relative -m-0.5 flex cursor-pointer items-center justify-center",
                                "rounded-full border-2 border-transparent p-0.5 focus:outline-none",
                                "focus:ring-0 active:outline-none active:ring-0",
                                {
                                    [`border-${color.tw}`]: active || checked,
                                },
                            )
                        }
                    >
                        <span
                            className={cn(
                                "h-8 w-8 rounded-full border border-black border-opacity-10",
                                `bg-${color.tw}`,
                            )}
                        />
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
};

const SelectModel = () => {
    const { model, setModel } = useOptions();

    return (
        <div className="relative flex w-full flex-col gap-3">
            <Label>Model</Label>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" role="combobox" className="w-full justify-between">
                        {model.label}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {MODELS.map(model2 => (
                        <DropdownMenuItem
                            key={model2.value}
                            className={cn(
                                "flex cursor-default items-center gap-1 p-1.5 text-sm hover:bg-zinc-100",
                                {
                                    "bg-zinc-100": model2.label === model.label,
                                },
                            )}
                            onClick={() => {
                                setModel(model2);
                            }}
                        >
                            <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    model2.label === model.label ? "opacity-100" : "opacity-0",
                                )}
                            />
                            {model2.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

const SelectMaterial = () => {
    const { material, setMaterial } = useOptions();
    return (
        <RadioGroup value={material} onChange={material => setMaterial(material)}>
            <Label>Material</Label>
            <div className="mt-3 space-y-4">
                {MATERIALS.map(option => (
                    <RadioGroup.Option
                        key={option.value}
                        value={option}
                        className={({ active, checked }) =>
                            cn(
                                "relative block cursor-pointer rounded-lg border-2 border-zinc-200",
                                "bg-white px-6 py-4 shadow-sm outline-none ring-0 focus:outline-none",
                                "focus:ring-0 sm:flex sm:justify-between",
                                {
                                    "border-primary": active || checked,
                                },
                            )
                        }
                    >
                        <span className="flex items-center">
                            <span className="flex flex-col text-sm">
                                <RadioGroup.Label className="font-medium text-gray-900" as="span">
                                    {option.label}
                                </RadioGroup.Label>

                                {option.description ? (
                                    <RadioGroup.Description as="span" className="text-gray-500">
                                        <span className="block sm:inline">
                                            {option.description}
                                        </span>
                                    </RadioGroup.Description>
                                ) : null}
                            </span>
                        </span>

                        <RadioGroup.Description
                            as="span"
                            className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                        >
                            <span className="font-medium text-gray-900">
                                {formatPrice(option.price / 100)}
                            </span>
                        </RadioGroup.Description>
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
};

const SelectFinish = () => {
    const { finish, setFinish } = useOptions();
    return (
        <RadioGroup value={finish} onChange={finish => setFinish(finish)}>
            <Label>Finish</Label>
            <div className="mt-3 space-y-4">
                {FINISHES.map(option => (
                    <RadioGroup.Option
                        key={option.value}
                        value={option}
                        className={({ active, checked }) =>
                            cn(
                                "relative block cursor-pointer rounded-lg border-2 border-zinc-200",
                                "bg-white px-6 py-4 shadow-sm outline-none ring-0 focus:outline-none",
                                "focus:ring-0 sm:flex sm:justify-between",
                                {
                                    "border-primary": active || checked,
                                },
                            )
                        }
                    >
                        <span className="flex items-center">
                            <span className="flex flex-col text-sm">
                                <RadioGroup.Label className="font-medium text-gray-900" as="span">
                                    {option.label}
                                </RadioGroup.Label>

                                {option.description ? (
                                    <RadioGroup.Description as="span" className="text-gray-500">
                                        <span className="block sm:inline">
                                            {option.description}
                                        </span>
                                    </RadioGroup.Description>
                                ) : null}
                            </span>
                        </span>

                        <RadioGroup.Description
                            as="span"
                            className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                        >
                            <span className="font-medium text-gray-900">
                                {formatPrice(option.price / 100)}
                            </span>
                        </RadioGroup.Description>
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
};

const Spinner = (props: { className?: string }) => {
    return (
        <svg
            className={cn("h-5 w-5 animate-spin text-white", props.className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx={12}
                cy={12}
                r={10}
                stroke="currentColor"
                strokeWidth={4}
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
};

const PriceAndContinue = (p: { onContinue: () => void; loading: boolean }) => {
    const { finish, material } = useOptions();
    return (
        <div className="h-16 w-full bg-white px-8">
            <div className="h-px w-full bg-zinc-200" />
            <div className="flex h-full w-full items-center justify-end">
                <div className="flex w-full items-center gap-6">
                    <p className="whitespace-nowrap font-medium">
                        {formatPrice((BASE_PRICE + finish.price + material.price) / 100)}
                    </p>
                    <Button
                        onClick={p.onContinue}
                        loadingText="Saving"
                        size="sm"
                        className="w-full"
                    >
                        Continue
                        {p.loading ? (
                            <Spinner className="ml-1.5 inline h-4 w-4" />
                        ) : (
                            <ArrowRight className="ml-1.5 inline h-4 w-4" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const DesignCase = (p: { createCaseId: string; imageUrl: string; imageDimension: TDimension }) => {
    const { containerRef, phoneCaseRef, setRenderedDimension, setRenderedPosition, cropImage } =
        useCropImage(p.imageUrl, p.imageDimension);

    const { startUpload } = useUploadThing("imageUploader");
    const options = useOptions();

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    return (
        <div className="relative mb-20 mt-20 grid grid-cols-1 pb-20 lg:grid-cols-3">
            <ImagePositioner
                imageUrl={p.imageUrl}
                imageDimension={p.imageDimension}
                containerRef={containerRef}
                phoneCaseRef={phoneCaseRef}
                setRenderedDimension={setRenderedDimension}
                setRenderedPosition={setRenderedPosition}
            />
            <div className="col-span-full flex h-[37.5rem] w-full flex-col bg-white lg:col-span-1">
                <ScrollArea className="relative flex-1 overflow-auto">
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-white"
                    />
                    <div className="px-8 pb-12 pt-8">
                        <h2 className="text-3xl font-bold tracking-tight">Customize your case</h2>
                        <div className="my-6 h-px w-full bg-zinc-200" />

                        <div className="relative mt-4 flex h-full flex-col justify-between">
                            <div className="flex flex-col gap-6">
                                <SelectColor />
                                <SelectModel />
                                <SelectMaterial />
                                <SelectFinish />
                            </div>
                        </div>
                    </div>
                </ScrollArea>
                <PriceAndContinue
                    onContinue={async () => {
                        try {
                            setLoading(true);
                            const croppedImage = await cropImage();
                            if (!croppedImage) {
                                return;
                            }
                            await Promise.all([
                                startUpload([croppedImage], { createCaseId: p.createCaseId }),
                                updateCreateCase({
                                    createCaseId: p.createCaseId,
                                    phoneModel: options.model.value,
                                    caseMaterial: options.material.value,
                                    caseFinish: options.finish.value,
                                    caseColor: options.color.value,
                                }),
                            ]);
                            router.push(`/create-case/preview?id=${p.createCaseId}`);
                        } catch (e: any) {
                            setLoading(false);
                            toast.error("Something went wrong", {
                                description: e?.message,
                            });
                        }
                    }}
                    loading={loading}
                />
            </div>
        </div>
    );
};

export default DesignCase;
