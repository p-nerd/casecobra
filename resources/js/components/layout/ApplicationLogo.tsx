import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import images from "@/lib/images";

const ApplicationLogo = (props: HTMLAttributes<HTMLImageElement>) => {
    return <img src={images.snake1} {...props} className={cn("w-36", props.className)} alt="" />;
};

export default ApplicationLogo;
