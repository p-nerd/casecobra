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

export const formatDate = (_date: string): string => {
    const date = new Date(_date);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear().toString();

    return `${day}-${month}-${year}`;
};

export const isObjectEmpty = (obj: object) => {
    return Object.keys(obj).length === 0;
};
