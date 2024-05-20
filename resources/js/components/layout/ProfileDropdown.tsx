import { Link, router } from "@inertiajs/react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const DownIcon = () => {
    return (
        <svg
            className="-me-0.5 ms-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
        </svg>
    );
};

const ProfileDropdown = (props: {
    user: {
        name: string;
        email: string;
        avatar?: string;
    };
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 space-x-1 rounded-full">
                    {props.user.avatar ? (
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={props.user.avatar} alt={props.user.name} />
                        </Avatar>
                    ) : (
                        <></>
                    )}
                    <div>{props.user.name}</div>
                    <DownIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[150] w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{props.user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {props.user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href="/profile">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <Link href="/orders">
                        <DropdownMenuItem>Orders</DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.post("/logout")}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileDropdown;
