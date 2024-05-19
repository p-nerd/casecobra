import type { TProps } from "@/types";
import { useEffect, type ReactNode } from "react";

import { Head, usePage } from "@inertiajs/react";
import { Toaster } from "@/components/ui/sonner";

import toast from "@/lib/toast";

const Layout = (props: { children: ReactNode; title: string }) => {
    const errors = usePage<TProps<{ errors: { [key: string]: string } }>>().props.errors;

    useEffect(() => {
        if (errors?.message) {
            toast.error(errors.message);
        }
    }, [errors?.message]);

    return (
        <>
            <Head title={props.title} />
            {props.children}
            <Toaster position="top-right" />
        </>
    );
};

export default Layout;
