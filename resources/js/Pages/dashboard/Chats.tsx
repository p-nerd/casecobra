import SiteLayout from "@/layouts/SiteLayout";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@inertiajs/react";
import { MessageSquareIcon, Package2Icon, SendIcon, SettingsIcon, UsersIcon } from "lucide-react";

const Sidebar = () => {
    return (
        <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
            <div className="flex flex-col gap-2">
                <div className="flex h-[60px] items-center px-6">
                    <Link className="flex items-center gap-2 font-semibold" href="#">
                        <Package2Icon className="h-6 w-6" />
                        <span className="">Acme Inc</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        <Link
                            className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                            href="#"
                        >
                            <MessageSquareIcon className="h-4 w-4" />
                            Active Chats
                            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                12
                            </Badge>
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#"
                        >
                            <UsersIcon className="h-4 w-4" />
                            Customers
                        </Link>
                        <Link
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="#"
                        >
                            <SettingsIcon className="h-4 w-4" />
                            Settings
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

const Messages = () => {
    return (
        <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]">
                <div className="flex-1">
                    <h1 className="text-lg font-semibold">Support Chat</h1>
                </div>
            </header>
            <main className="flex flex-1 flex-col">
                <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div className="rounded-lg border bg-white p-4 shadow-sm">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage alt="User" src="/placeholder-user.jpg" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="grid items-start gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-bold">John Doe</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            2:39pm
                                        </div>
                                    </div>
                                    <div>
                                        <p>
                                            Hi, I'm having trouble with my order. Can you please
                                            help me?
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start justify-end gap-4">
                                <div className="grid items-start gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-bold">Support Agent</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            2:40pm
                                        </div>
                                    </div>
                                    <div>
                                        <p>
                                            Hi John, I'd be happy to help you with your order. Could
                                            you please provide me with the order number?
                                        </p>
                                    </div>
                                </div>
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage alt="Support Agent" src="/placeholder-user.jpg" />
                                    <AvatarFallback>SA</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex items-start gap-4">
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage alt="User" src="/placeholder-user.jpg" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div className="grid items-start gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-bold">John Doe</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            2:41pm
                                        </div>
                                    </div>
                                    <div>
                                        <p>The order number is #12345.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start justify-end gap-4">
                                <div className="grid items-start gap-1 text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="font-bold">Support Agent</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            2:42pm
                                        </div>
                                    </div>
                                    <div>
                                        <p>
                                            Thank you, John. Let me look into that for you. One
                                            moment, please.
                                        </p>
                                    </div>
                                </div>
                                <Avatar className="h-10 w-10 border">
                                    <AvatarImage alt="Support Agent" src="/placeholder-user.jpg" />
                                    <AvatarFallback>SA</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sticky bottom-0 mx-auto flex w-full flex-col gap-1.5 px-4 py-2 dark:bg-gray-950">
                    <div className="relative">
                        <Textarea
                            className="min-h-[48px] resize-none rounded-2xl border border-neutral-400 bg-white p-4 pr-16 shadow-sm dark:border-gray-800"
                            id="message"
                            name="message"
                            placeholder="Type your message..."
                            rows={1}
                        />
                        <Button
                            className="absolute right-3 top-3 h-8 w-8 rounded-full"
                            size="icon"
                            type="submit"
                        >
                            <SendIcon className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
};

type TUser = {
    id: number;
    name: string;
    email: string;
    role: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    stripe_id: string | null;
    pm_type: string | null;
    pm_last_four: string | null;
    trial_ends_at: string | null;
};

type TMessage = {
    id: number;
    user_id: number;
    replier_id: number | null;
    content: string;
    created_at: string;
    updated_at: string;
};

type TChat = TUser & {
    messages: TMessage[];
};

const Chats = (props: { chats: TChat[] }) => {
    return (
        <SiteLayout hideFooter={true} title="Chat Support">
            <div className="grid flex-1 overflow-hidden lg:grid-cols-[280px_1fr]">
                <Sidebar />
                <Messages />
            </div>
        </SiteLayout>
    );
};

export default Chats;
