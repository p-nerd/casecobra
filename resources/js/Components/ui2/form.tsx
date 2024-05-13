import { type PropsWithChildren, type HTMLInputTypeAttribute } from "react";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import { Label } from "@/Components/ui/label";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

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
    autoComplete?: string;
    required?: boolean;
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
                autoComplete={props.autoComplete}
                required={props.required}
            />
            {props.error ? <InputError message={props.error} className="mt-2" /> : <></>}
        </div>
    );
};

export const CheckboxField = (props: {
    label?: string;
    name: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}) => {
    return (
        <div>
            <label className="flex cursor-pointer items-center">
                <Checkbox
                    name={props.name}
                    checked={props.checked}
                    onChange={e => props.onChange(e.target.checked)}
                />
                {props.label ? (
                    <span className="ms-2 text-sm text-gray-600">{props.label}</span>
                ) : (
                    <></>
                )}
            </label>
        </div>
    );
};

export const DireactionLink = (props: { href: string; label: string }) => {
    return (
        <Link
            href={props.href}
            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            {props.label}
        </Link>
    );
};
