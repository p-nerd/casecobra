import { buttonVariants } from "@/components/ui/button";

import { Link } from "@inertiajs/react";

const DashboardDropdown = () => {
    return (
        <Link
            href="/dashboard"
            className={buttonVariants({
                size: "sm",
                variant: "ghost",
            })}
        >
            Dashboard ✨
        </Link>
    );
};

export default DashboardDropdown;
