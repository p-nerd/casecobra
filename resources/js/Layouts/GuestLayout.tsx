import ApplicationLogo from "@/Components/ApplicationLogo";
import { type PropsWithChildren } from "react";
import { Link } from "@inertiajs/react";
import { Card } from "@/Components/ui/card";

const Guest = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex min-h-screen flex-col items-center gap-6 bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-36" />
                </Link>
            </div>
            <Card className="w-full bg-white px-6 py-4 sm:max-w-md">{children}</Card>
        </div>
    );
};

export default Guest;
