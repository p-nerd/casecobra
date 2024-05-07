import { type ReactNode } from "react";
import { MaxWidthWrapper } from "@/components/misc";

const ConfigureLayout = (p: { children: ReactNode }) => {
    return <MaxWidthWrapper className="flex flex-1 flex-col">{p.children}</MaxWidthWrapper>;
};

export default ConfigureLayout;
