import { type ReactNode } from "react";
import { MaxWidthWrapper } from "@/components/misc";
import Steps from "./Steps";

const CreateCaseLayout = (p: { children: ReactNode }) => {
    return (
        <MaxWidthWrapper className="flex flex-1 flex-col">
            <Steps />
            {p.children}
        </MaxWidthWrapper>
    );
};

export default CreateCaseLayout;
