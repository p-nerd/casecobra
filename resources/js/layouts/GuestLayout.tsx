import type { PropsWithChildren } from "react";

import { Card } from "@/components/ui/card";
import { Link } from "@inertiajs/react";

import ApplicationLogo from "@/components/layout/ApplicationLogo";
import BaseLayout from "./BaseLayout";

const Guest = (props: PropsWithChildren<{ title: string }>) => {
    return (
        <BaseLayout title={props.title}>
            <div className="flex min-h-screen flex-col items-center gap-6 bg-gray-100 pt-6 sm:justify-center sm:pt-0">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="w-36" />
                    </Link>
                </div>
                <Card className="w-full bg-white px-6 py-4 sm:max-w-md">{props.children}</Card>
            </div>
        </BaseLayout>
    );
};

export default Guest;
