import ApplicationLogo from "@/Components/ApplicationLogo";
import { type PropsWithChildren } from "react";
import { Head, Link } from "@inertiajs/react";
import { Card } from "@/Components/ui/card";

const Guest = (props: PropsWithChildren<{ title: string }>) => {
    return (
        <div className="flex min-h-screen flex-col items-center gap-6 bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <Head title={props.title} />
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-36" />
                </Link>
            </div>
            <Card className="w-full bg-white px-6 py-4 sm:max-w-md">{props.children}</Card>
        </div>
    );
};

export default Guest;
