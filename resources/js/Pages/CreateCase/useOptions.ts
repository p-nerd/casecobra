import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const BASE_PRICE = 14_00;

export const COLORS = [
    // bg-zinc-900 border-zinc-900
    { label: "Black", value: "black", tw: "zinc-900" },
    // bg-blue-950 border-blue-950
    {
        label: "Blue",
        value: "blue",
        tw: "blue-950",
    },
    // bg-rose-950 border-rose-950
    { label: "Rose", value: "rose", tw: "rose-950" },
] as const;

export const MODELS = [
    {
        label: "iPhone X",
        value: "iphonex",
    },
    {
        label: "iPhone 11",
        value: "iphone11",
    },
    {
        label: "iPhone 12",
        value: "iphone12",
    },
    {
        label: "iPhone 13",
        value: "iphone13",
    },
    {
        label: "iPhone 14",
        value: "iphone14",
    },
    {
        label: "iPhone 15",
        value: "iphone15",
    },
] as const;

export const MATERIALS = [
    {
        label: "Silicone",
        value: "silicone",
        description: undefined,
        price: 0,
    },
    {
        label: "Soft Polycarbonate",
        value: "polycarbonate",
        description: "Scratch-resistant coating",
        price: 5_00,
    },
] as const;

export const FINISHES = [
    {
        label: "Smooth Finish",
        value: "smooth",
        description: undefined,
        price: 0,
    },
    {
        label: "Textured Finish",
        value: "textured",
        description: "Soft grippy texture",
        price: 3_00,
    },
] as const;

const useOptions = create<{
    color: (typeof COLORS)[number];
    setColor: (color: (typeof COLORS)[number]) => void;
    model: (typeof MODELS)[number];
    setModel: (model: (typeof MODELS)[number]) => void;
    material: (typeof MATERIALS)[number];
    setMaterial: (material: (typeof MATERIALS)[number]) => void;
    finish: (typeof FINISHES)[number];
    setFinish: (finish: (typeof FINISHES)[number]) => void;
}>()(
    immer(set => ({
        color: COLORS[0],
        setColor: color => {
            set(state => {
                state.color = color;
            });
        },
        model: MODELS[0],
        setModel: model => {
            set(state => {
                state.model = model;
            });
        },
        material: MATERIALS[0],
        setMaterial: material => {
            set(state => {
                state.material = material;
            });
        },
        finish: FINISHES[0],
        setFinish: finish => {
            set(state => {
                state.finish = finish;
            });
        },
    })),
);

export default useOptions;
