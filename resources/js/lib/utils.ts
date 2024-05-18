import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return formatter.format(price);
};

export const calculatePrice = (
    basePrice: number,
    material?: { price: number },
    finish?: { price: number },
) => {
    return (basePrice + (finish?.price || 0) + (material?.price || 0)) / 100;
};
