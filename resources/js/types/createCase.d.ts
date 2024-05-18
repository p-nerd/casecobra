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
    id: TID;
    label: string;
    name: string;
    value: string;
};

export type TModel = {
    id: TID;
    label: string;
    value: string;
};

export type TMaterial = {
    id: TID;
    label: string;
    value: string;
    description: string;
    price: number;
};

export type TFinish = {
    id: TID;
    label: string;
    value: string;
    description: string;
    price: number;
};
