import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Container } from "@/components/ui2/misc";

import images from "@/lib/images";

import SiteLayout from "./SiteLayout";

const STEPS = [
    {
        name: "Step 1: Add Image",
        description: "Choose an image for your case",
        pathname: "/create-case/upload",
        image: images.snake1,
    },
    {
        name: "Step 2: Customize Design",
        description: "Make the case yours",
        pathname: "/create-case/design",
        image: images.snake2,
    },
    {
        name: "Step 3: Summery",
        description: "Review your final design",
        pathname: "/create-case/preview",
        image: images.snake3,
    },
];

const Steps = () => {
    const pathname = window.location.pathname;

    return (
        <ol className="bg:border-r bg:border-gray-200 rounded-md bg-white lg:flex lg:rounded-none">
            {STEPS.map((step, index) => {
                const isCurrentStep = step.pathname === pathname;
                const isStepCompleted = STEPS.slice(index + 1).some(step =>
                    pathname.endsWith(step.pathname),
                );
                return (
                    <li key={step.name} className="relative overflow-hidden lg:flex-1">
                        <div>
                            <span
                                className={cn(
                                    "absolute left-0 top-0 h-full w-1 bg-zinc-400 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full",
                                    {
                                        "bg-zinc-700": isCurrentStep,
                                        "bg-primary": isStepCompleted,
                                    },
                                )}
                                aria-hidden="true"
                            />
                            <span
                                className={cn("flex items-center px-6 py-4 text-sm font-medium", {
                                    "lg:pl-9": index !== 0,
                                })}
                            >
                                <span className="flex-shrink-0">
                                    <img
                                        src={step.image}
                                        alt=""
                                        className={cn(
                                            "flex h-20 w-20 items-center justify-center object-contain",
                                            {
                                                "border-none": isStepCompleted,
                                                "border-zinc-700": isCurrentStep,
                                            },
                                        )}
                                    />
                                </span>
                                <span className="ml-4 mt-0.5 flex h-full min-w-0 flex-col justify-center">
                                    <span
                                        className={cn("text-sm font-semibold text-zinc-700", {
                                            "text-primary": isStepCompleted,
                                            "text-zinc-700": isCurrentStep,
                                        })}
                                    >
                                        {step.name}
                                    </span>
                                    <span className="text-sm text-zinc-500">
                                        {step.description}
                                    </span>
                                </span>
                            </span>
                            {/* separator */}
                            {index !== 0 ? (
                                <div className="absolute inset-0 hidden w-3 lg:block">
                                    <svg
                                        className="h-full w-full text-gray-300"
                                        viewBox="0 0 12 82"
                                        fill="none"
                                        preserveAspectRatio="none"
                                    >
                                        <path
                                            d="M0.5 0V31L10.5 41L0.5 51V82"
                                            stroke="currentcolor"
                                            vectorEffect="non-scaling-stroke"
                                        />
                                    </svg>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </li>
                );
            })}
        </ol>
    );
};

const CreateCaseLayout = (props: { title: string; children: ReactNode }) => {
    return (
        <SiteLayout title={props.title}>
            <Container className="flex flex-1 flex-col">
                <Steps />
                {props.children}
            </Container>
        </SiteLayout>
    );
};

export default CreateCaseLayout;
