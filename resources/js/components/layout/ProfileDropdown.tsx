import { router } from "@inertiajs/react";

import { Link } from "@inertiajs/react";
import { Icons } from "@/components/ui2/misc";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

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
                <Button variant="ghost" className="relative h-8 rounded-full">
                    {props.user.avatar ? (
                        <Avatar className="mr-2 h-5 w-5">
                            <AvatarImage
                                src={props.user.avatar}
                                alt={props.user.name}
                                className="object-contain"
                            />
                        </Avatar>
                    ) : (
                        <></>
                    )}
                    <div>{props.user.name}</div>
                    <Icons.Down className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[150] w-56" align="end" forceMount>
                <DropdownMenuLabel className="flex items-center gap-2 font-normal">
                    {props.user.avatar ? (
                        <Avatar className="h-10 w-10">
                            <AvatarImage
                                src={props.user.avatar}
                                alt={props.user.name}
                                className="object-contain"
                            />
                        </Avatar>
                    ) : (
                        <></>
                    )}
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
