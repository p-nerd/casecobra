import type { TProps } from "@/types";
import type { TImage } from "@/screens/createCase/design/ImagePositioner";
import type { TColor, TFinish, TMaterial, TModel } from "@/states/useCreateCaseDesign";

import { formatPrice } from "@/lib/utils";
import { useCropImage } from "@/screens/createCase/design/ImagePositioner";
import { useEffect, useState } from "react";

import { Button } from "@/Components/ui/button";
import { ArrowRight } from "lucide-react";
import { ScrollArea } from "@/Components/ui/scroll-area";

import toast from "@/lib/toast";
import useCreateCaseDesign, { calculatePrice } from "@/states/useCreateCaseDesign";

import SelectColor from "@/screens/createCase/design/SelectColor";
import SelectModel from "@/screens/createCase/design/SelectModel";
import SelectFinish from "@/screens/createCase/design/SelectFinish";
import SelectMaterial from "@/screens/createCase/design/SelectMaterial";
import ImagePositioner from "@/screens/createCase/design/ImagePositioner";
import CreateCaseLayout from "@/Layouts/CreateCaseLayout";

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

type TDesignProps = TProps<{
    image: TImage;
    colors: TColor[];
    models: TModel[];
    materials: TMaterial[];
    finishes: TFinish[];
    basePrice: number;
}>;

const Design = (p: TDesignProps) => {
    const [loading, setLoading] = useState(false);

    const cropImage = useCropImage(p.image);
    const createCaseDesign = useCreateCaseDesign();

    useEffect(() => {
        createCaseDesign.setColor(p.colors[0]);
        createCaseDesign.setModel(p.models[0]);
        createCaseDesign.setMaterial(p.materials[0]);
        createCaseDesign.setFinish(p.finishes[0]);
    }, []);

    return (
        <CreateCaseLayout title="Design the case">
            <div className="relative mb-20 mt-20 grid grid-cols-1 pb-20 lg:grid-cols-3">
                <ImagePositioner image={p.image} cropImage={cropImage} />
                <div className="col-span-full flex h-[37.5rem] w-full flex-col bg-white lg:col-span-1">
                    <ScrollArea className="relative flex-1 overflow-auto">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-white"
                        />
                        <div className="px-8 pb-12 pt-8">
                            <h2 className="text-3xl font-bold tracking-tight">
                                Customize your case
                            </h2>
                            <div className="my-6 h-px w-full bg-zinc-200" />

                            <div className="relative mt-4 flex h-full flex-col justify-between">
                                <div className="flex flex-col gap-6">
                                    <SelectColor colors={p.colors} />
                                    <SelectModel models={p.models} />
                                    <SelectMaterial materials={p.materials} />
                                    <SelectFinish finishes={p.finishes} />
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                    <PriceAndContinue
                        basePrice={p.basePrice}
                        onContinue={async () => {
                            try {
                                setLoading(true);
                                const croppedImage = await cropImage.crop();
                                if (!croppedImage) {
                                    return;
                                }
                                await Promise.all([
                                    // startUpload([croppedImage], { createCaseId: p.createCaseId }),
                                    // updateCreateCase({
                                    //     createCaseId: p.createCaseId,
                                    //     phoneModel: options.model.value,
                                    //     caseMaterial: options.material.value,
                                    //     caseFinish: options.finish.value,
                                    //     caseColor: options.color.value,
                                    // }),
                                ]);
                                // router.push(`/create-case/preview?id=${p.createCaseId}`);
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
        </CreateCaseLayout>
    );
};

export default Design;