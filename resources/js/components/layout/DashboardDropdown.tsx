import { Link } from "@inertiajs/react";
import { Icons } from "@/components/ui2/parts";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const DashboardDropdown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 rounded-full">
                    ✨ Dashboard
                    <Icons.Down className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[150] w-56" align="end" forceMount>
                <DropdownMenuGroup>
                    <Link href="/dashboard/overview">
                        <DropdownMenuItem>Overview</DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/orders">
                        <DropdownMenuItem>Orders</DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/chats">
                        <DropdownMenuItem>Chats</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href="/dashboard/settings">
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DashboardDropdown;
