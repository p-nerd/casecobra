import type { TColor, TFinish, TMaterial, TModel } from "@/types/createCase";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useCreateCaseDesign = create<{
    color?: TColor;
    setColor: (color?: TColor) => void;
    model?: TModel;
    setModel: (model?: TModel) => void;
    material?: TMaterial;
    setMaterial: (material?: TMaterial) => void;
    finish?: TFinish;
    setFinish: (finish?: TFinish) => void;
}>()(
    immer(set => ({
        color: undefined,
        setColor: color => {
            set(state => {
                state.color = color;
            });
        },
        model: undefined,
        setModel: model => {
            set(state => {
                state.model = model;
            });
        },
        material: undefined,
        setMaterial: material => {
            set(state => {
                state.material = material;
            });
        },
        finish: undefined,
        setFinish: finish => {
            set(state => {
                state.finish = finish;
            });
        },
    })),
);

export default useCreateCaseDesign;
