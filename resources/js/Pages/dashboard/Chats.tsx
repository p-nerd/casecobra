import type { TProps } from "@/types";

import { cn } from "@/lib/utils";
import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { router, usePage } from "@inertiajs/react";

import { Link } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Fragment } from "react/jsx-runtime";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package2Icon, SendIcon } from "lucide-react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

import SiteLayout from "@/layouts/SiteLayout";
import { useState } from "react";

const useChatsState = create<{
    activeChatIndex: number;
    setActiveChatIndex: (activeChatIndex: number) => void;
}>()(
    immer(set => ({
        activeChatIndex: 0,
        setActiveChatIndex: activeChatIndex => {
            set(state => {
                state.activeChatIndex = activeChatIndex;
            });
        },
    })),
);

const Sidebar = () => {
    const chats = usePage<TProps<TChatsProps>>().props.chats;

    const { activeChatIndex, setActiveChatIndex } = useChatsState();

    return (
        <ScrollArea className="hidden h-[calc(100vh-3.5rem-1px)] rounded-md border border-r bg-gray-100/40 lg:block">
            <div className="flex flex-col gap-2">
                <div className="flex h-[60px] items-center px-6">
                    <Link className="flex items-center gap-2 font-semibold" href="#">
                        <Package2Icon className="h-6 w-6" />
                        <span className="">Chat Support</span>
                    </Link>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        {chats.map((chat, index) => (
                            <button
                                onClick={() => setActiveChatIndex(index)}
                                key={chat.id}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900",
                                    { "bg-white": index === activeChatIndex },
                                )}
                            >
                                <Avatar className="h-8 w-8 shrink-0 border">
                                    <AvatarImage alt="Agent" src={chat.avatar} />
                                    <AvatarFallback>
                                        {chat.name?.slice(0, 1)?.toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                {chat.name}
                                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    12
                                </Badge>
                            </button>
                        ))}
                    </nav>
                </div>
            </div>
        </ScrollArea>
    );
};

const formatChatMessageDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return "Invalid date";
    }
    const time = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const formattedDate = date.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
    return `${formattedDate} at ${time}`;
};

const UserMessage = (props: { message: TMessage; user: TUser }) => {
    return (
        <div className="flex items-start gap-4 rounded-2xl border bg-white p-4 shadow-sm">
            <Avatar className="h-10 w-10 border">
                <AvatarImage alt={props.user.name} src={props.user.avatar} />
                <AvatarFallback>{props.user.name?.slice(0, 1)?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="grid items-start gap-1 text-sm">
                <div className="flex items-center gap-2">
                    <div className="font-bold">{props.user.name}</div>
                    <div className="text-sm text-gray-500">
                        {formatChatMessageDate(props.message.created_at)}
                    </div>
                </div>
                <div>
                    <p>{props.message.content}</p>
                </div>
            </div>
        </div>
    );
};

const ReplierMessage = (props: { message: TMessage }) => {
    const { repliers } = usePage<TProps<TChatsProps>>().props;

    const replier = repliers.find(replier => props.message.replier_id === replier.id);

    return (
        <div className="flex items-start justify-end gap-4 rounded-2xl border bg-primary p-4 text-primary-foreground shadow-sm">
            <div className="grid items-start gap-1 text-sm">
                <div className="flex items-center justify-end gap-2">
                    <div className="text-sm text-white">
                        {formatChatMessageDate(props.message.created_at)}
                    </div>
                    <div className="font-bold">{replier?.name}</div>
                </div>
                <p className="text-end">{props.message.content}</p>
            </div>
            <Avatar className="h-10 w-10 border">
                <AvatarImage alt={replier?.name} src={replier?.avatar} />
                <AvatarFallback>{replier?.name?.slice(0, 1)?.toUpperCase()}</AvatarFallback>
            </Avatar>
        </div>
    );
};

const Messages = () => {
    const { chats, auth } = usePage<TProps<TChatsProps>>().props;
    const { activeChatIndex } = useChatsState();

    const user = chats[activeChatIndex];
    const messages = user.messages;

    const [content, setContent] = useState("");

    const handleSubmit = () => {
        router.post(
            route("messages.save"),
            {
                content,
                user_id: user.id,
                replier_id: auth.user?.id,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setContent("");
                },
            },
        );
    };

    return (
        <ScrollArea className="h-[calc(100vh-3.5rem-1px)]">
            <div className="flex h-full flex-col gap-2 overflow-y-auto p-6">
                {messages.map(message => (
                    <Fragment key={message.id}>
                        {!message.replier_id ? (
                            <UserMessage message={message} user={user} />
                        ) : (
                            <ReplierMessage message={message} />
                        )}
                    </Fragment>
                ))}
            </div>
            <div className="sticky bottom-0 mx-auto flex w-full flex-col gap-1.5 px-4 py-2">
                <div className="relative">
                    <Textarea
                        className="min-h-[48px] resize-none rounded-2xl border border-neutral-400 bg-white p-4 pr-16 shadow-sm"
                        id="message"
                        name="message"
                        placeholder="Type your message..."
                        rows={1}
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                    <Button
                        className="absolute right-3 top-3 h-8 w-8 rounded-full"
                        size="icon"
                        onClick={handleSubmit}
                    >
                        <SendIcon className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </div>
            </div>
        </ScrollArea>
    );
};

type TUser = {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
    avatar: string;
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

type TChatsProps = {
    chats: TChat[];
    repliers: TUser[];
};

const Chats = () => {
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
