import type { HTMLAttributes, PropsWithChildren, HTMLInputTypeAttribute, RefObject } from "react";

import { cn } from "@/lib/utils";

import { Link } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

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

export const InputError = ({
    message,
    className = "",
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) => {
    return message ? (
        <p {...props} className={"text-sm text-red-600 " + className}>
            {message}
        </p>
    ) : null;
};

export const TextField = (props: {
    name: string;
    value: string;
    onChange: (value: string) => void;
    autoFocus?: boolean;
    type?: HTMLInputTypeAttribute;
    label?: string;
    error?: string;
    className?: string;
    autoComplete?: string;
    required?: boolean;
    placeholder?: string;
    ref?: RefObject<HTMLInputElement>;
}) => {
    return (
        <div>
            {props.label ? (
                <Label htmlFor={props.name} className="mb-2">
                    {props.label}
                </Label>
            ) : (
                <></>
            )}
            <Input
                id={props.name}
                name={props.name}
                type={props.type || "text"}
                value={props.value}
                className={cn("block w-full", props.className)}
                autoFocus={props.autoFocus}
                onChange={e => props.onChange(e.target.value)}
                autoComplete={props.autoComplete}
                required={props.required}
                placeholder={props.placeholder}
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
                    id={props.name}
                    name={props.name}
                    checked={props.checked}
                    onCheckedChange={checked => props.onChange(!!checked)}
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

export const DirectionLink = (props: { href: string; label: string }) => {
    return (
        <Link
            href={props.href}
            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            {props.label}
        </Link>
    );
};
