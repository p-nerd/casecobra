import type { LucideProps } from "lucide-react";
import type { ReactNode, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import images from "@/lib/images";

export const Container = (p: { className?: string; children: ReactNode }) => {
    return (
        <div className={cn("mx-auto h-full w-full max-w-screen-xl px-2.5 lg:px-20", p.className)}>
            {p.children}
        </div>
    );
};

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string;
    dark?: boolean;
}

export const Phone = ({ imgSrc, className, dark = false, ...props }: PhoneProps) => {
    return (
        <div
            className={cn("pointer-events-none relative z-50 overflow-hidden", className)}
            {...props}
        >
            <img
                src={dark ? images.phoneTemplateDarkEdges : images.phoneTemplateWhiteEdges}
                className="pointer-events-none z-50 select-none"
                alt="phone image"
            />

            <div className="absolute inset-0 -z-10">
                <img
                    className="min-h-full min-w-full object-cover"
                    src={imgSrc}
                    alt="overlaying phone image"
                />
            </div>
        </div>
    );
};

export const Icons = {
    underline: (props: LucideProps) => (
        <svg {...props} viewBox="0 0 687 155">
            <g
                stroke="currentColor"
                strokeWidth="7"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path
                    d="M20 98c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20"
                    opacity=".3"
                ></path>
                <path d="M20 118c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20"></path>
            </g>
        </svg>
    ),
    Down: (props: LucideProps) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
        </svg>
    ),
};

export const Header = (props: { children: ReactNode }) => {
    return (
        <header className="bg-white shadow lg:rounded-lg">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {props.children}
                </h2>
            </div>
        </header>
    );
};

export const Section = (props: { children: ReactNode; className?: string }) => {
    return (
        <section className={cn("w-full bg-white p-4 shadow sm:rounded-lg sm:p-8", props.className)}>
            {props.children}
        </section>
    );
};
