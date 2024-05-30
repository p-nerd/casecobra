import type { TProps } from "@/types";
import type { ReactNode } from "react";

import { useEffect } from "react";
import { usePage } from "@inertiajs/react";

import { Head } from "@inertiajs/react";
import { Toaster } from "@/components/ui/sonner";

import toast from "@/lib/toast";
import ChatBox from "@/components/chatbox/ChatBox";

const BaseLayout = (props: { children: ReactNode; title: string }) => {
    const errors = usePage<TProps<{ errors: { [key: string]: string } }>>().props.errors;

    useEffect(() => {
        if (errors?.message) {
            toast.error(errors.message);
        }
    }, [errors?.message]);

    return (
        <div className="relative">
            <Head title={props.title} />
            {props.children}
            <ChatBox />
            <Toaster position="bottom-right" />
        </div>
    );
};

export default BaseLayout;
