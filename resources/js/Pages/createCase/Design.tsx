import type { TProps } from "@/types";
import type { TCaseDesign, TImage, TColor, TFinish, TMaterial, TModel } from "@/types/createCase";

import { router } from "@inertiajs/react";
import { useCropImage } from "@/components/createCase/ImagePositioner";
import { getImageDimensions } from "@/lib/file";
import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

import toast from "@/lib/toast";
import useCreateCaseDesign from "@/states/useCreateCaseDesign";

import SelectColor from "@/components/createCase/SelectColor";
import SelectModel from "@/components/createCase/SelectModel";
import SelectFinish from "@/components/createCase/SelectFinish";
import SelectMaterial from "@/components/createCase/SelectMaterial";
import ImagePositioner from "@/components/createCase/ImagePositioner";
import CreateCaseLayout from "@/layouts/CreateCaseLayout";
import PriceAndContinue from "@/components/createCase/PriceAndContinue";

type TDesignProps = TProps<{
    caseDesign: TCaseDesign;
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
        const ccd = createCaseDesign;
        ccd.setColor(p.colors.find(c => c.id === p.caseDesign.colorId) || p.colors[0]);
        ccd.setModel(p.models.find(m => m.id === p.caseDesign.modelId) || p.models[0]);
        ccd.setMaterial(p.materials.find(m => m.id === p.caseDesign.materialId) || p.materials[0]);
        ccd.setFinish(p.finishes.find(f => f.id === p.caseDesign.finishId) || p.finishes[0]);
    }, []);

    const handleContinue = async () => {
        try {
            setLoading(true);
            const croppedImage = await cropImage.crop();
            if (!croppedImage) {
                return;
            }
            const dimensions = await getImageDimensions(croppedImage);
            router.post(
                "/create-case/design",
                {
                    croppedImage,
                    caseDesignId: p.caseDesign.id,
                    phoneModelId: createCaseDesign.model?.id,
                    colorId: createCaseDesign.color?.id,
                    materialId: createCaseDesign.material?.id,
                    finishId: createCaseDesign.finish?.id,
                    height: dimensions.height,
                    width: dimensions.width,
                },
                { forceFormData: true },
            );
        } catch (e: any) {
            toast.error("Something went wrong", {
                description: e?.message,
            });
        } finally {
            setLoading(false);
        }
    };
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
                        onContinue={handleContinue}
                        loading={loading}
                    />
                </div>
            </div>
        </CreateCaseLayout>
    );
};

export default Design;
