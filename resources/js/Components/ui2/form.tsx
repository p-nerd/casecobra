import { type PropsWithChildren, type HTMLInputTypeAttribute } from "react";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils";

export const Form = (props: PropsWithChildren<{ className?: string; onSubmit: () => void }>) => {
    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                props.onSubmit();
            }}
            className={cn("flex flex-col gap-4", props.className)}
        >
            {props.children}
        </form>
    );
};

export const TextField = (props: {
    name: string;
    value: string;
    onChange: (value: string) => void;
    isFocused?: boolean;
    type?: HTMLInputTypeAttribute;
    label?: string;
    error?: string;
    className?: string;
}) => {
    return (
        <div>
            {props.label ? (
                <Label htmlFor={props.name} className="mb-1">
                    {props.label}
                </Label>
            ) : (
                <></>
            )}
            <TextInput
                id={props.name}
                name={props.name}
                type={props.type}
                value={props.value}
                className={cn("block w-full", props.className)}
                isFocused={props.isFocused}
                onChange={e => props.onChange(e.target.value)}
            />
            {props.error ? <InputError message={props.error} className="mt-2" /> : <></>}
        </div>
    );
};
