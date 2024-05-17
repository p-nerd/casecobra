import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TColor = {
    id: string;
    label: string;
    name: string;
    value: string;
};

export type TModel = {
    id: string;
    label: string;
    value: string;
};

export type TMaterial = {
    id: string;
    label: string;
    value: string;
    description: string;
    price: number;
};

export type TFinish = {
    id: string;
    label: string;
    value: string;
    description: string;
    price: number;
};

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
