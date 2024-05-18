import type { TID } from "./index";

export type TCaseDesign = {
    id: TID;
    userId?: TID;
    modelId?: TID;
    colorId?: TID;
    materialId?: TID;
    finishId?: TID;
};

export type TImage = {
    url: string;
    alt?: string;
    height: number;
    width: number;
};

export type TColor = {
    id: number;
    label: string;
    name: string;
    value: string;
};

export type TModel = {
    id: number;
    label: string;
    value: string;
};

export type TMaterial = {
    id: number;
    label: string;
    value: string;
    description: string;
    price: number;
};

export type TFinish = {
    id: number;
    label: string;
    value: string;
    description: string;
    price: number;
};
