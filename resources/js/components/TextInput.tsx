import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    type InputHTMLAttributes,
} from "react";
import { Input } from "@/components/ui/input";

const TextInput = forwardRef(
    (
        {
            type = "text",
            className = "",
            isFocused = false,
            ...props
        }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
        ref,
    ) => {
        const localRef = useRef<HTMLInputElement>(null);

        useImperativeHandle(ref, () => ({
            focus: () => localRef.current?.focus(),
        }));

        useEffect(() => {
            if (isFocused) {
                localRef.current?.focus();
            }
        }, []);

        return <Input {...props} type={type} className={className} ref={localRef} />;
    },
);

export default TextInput;
