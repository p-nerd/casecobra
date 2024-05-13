import { type LabelHTMLAttributes } from "react";
import { Label } from "@/Components/ui/label";

export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <Label {...props} className={className}>
            {value ? value : children}
        </Label>
    );
}
