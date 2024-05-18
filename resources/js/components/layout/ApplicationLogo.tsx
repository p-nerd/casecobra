import { type HTMLAttributes } from "react";
import snake1 from "../../../images/snake-1.png";
import { cn } from "@/lib/utils";

const ApplicationLogo = (props: HTMLAttributes<HTMLImageElement>) => {
    return <img src={snake1} {...props} className={cn("w-36", props.className)} alt="" />;
};

export default ApplicationLogo;
