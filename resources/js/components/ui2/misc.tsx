import { type ReactNode, type HTMLAttributes } from "react";
import { type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";
import phoneTemplateDarkEdges from "../../../images/phone-template-dark-edges.png";
import phoneTemplateWhiteEdges from "../../../images/phone-template-white-edges.png";

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
                src={dark ? phoneTemplateDarkEdges : phoneTemplateWhiteEdges}
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
};
