import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";

import { Link } from "@inertiajs/react";
import { Icons } from "@/components/ui2/parts";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenu, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const Picture = (props: {
    src?: string;
    name: string;
    className?: string;
    fallbackClassName?: string;
}) => {
    return (
        <Avatar className={cn("h-5 w-5", props.className)}>
            <AvatarImage src={props.src} alt={props.name} className="object-contain" />
            <AvatarFallback className={cn("text-[8px]", props.fallbackClassName)}>
                {props.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
        </Avatar>
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
                <Button variant="ghost" className="relative h-8 rounded-full">
                    <Picture src={props.user.avatar} name={props.user.name} className="mr-2" />
                    <div>{props.user.name}</div>
                    <Icons.Down className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[150] w-56" align="end" forceMount>
                <DropdownMenuLabel className="flex items-center gap-2 font-normal">
                    <Picture
                        src={props.user.avatar}
                        name={props.user.name}
                        className="h-10 w-10"
                        fallbackClassName="text-[16px]"
                    />
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
