import type { TID, TMessage, TProps, TUser } from "@/types";

import { cn } from "@/lib/utils";
import { router, usePage } from "@inertiajs/react";
import { useCallback, useState } from "react";

import { Form } from "@/components/ui2/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircleMore, Minimize2, Send } from "lucide-react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";

import url from "@/lib/url";

const Messages = (props: { data: TMessage[]; user: TUser }) => {
    return (
        <div className="flex flex-col gap-4">
            {props.data?.map((message, index) => {
                const isChatter = !message.replier;
                return (
                    <div
                        key={index}
                        className={cn("flex items-start gap-3", {
                            "flex-row-reverse": isChatter,
                        })}
                    >
                        <Avatar className="h-8 w-8 shrink-0 border">
                            <AvatarImage alt="Agent" src="" />
                            <AvatarFallback>
                                {String(isChatter ? props.user.name : message.replier?.name)
                                    ?.slice(0, 1)
                                    ?.toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div
                            className={cn("rounded-lg bg-gray-100 p-3 text-sm", {
                                "bg-primary text-white": isChatter,
                            })}
                        >
                            <p>{message.content}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const AddChat = (props: { user_id: TID }) => {
    const [content, setContent] = useState("");

    return (
        <Form
            className="relative flex w-full flex-row gap-0"
            onSubmit={() => {
                router.post(
                    route("messages.save"),
                    {
                        content,
                        user_id: props.user_id,
                    },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        onSuccess: () => {
                            setContent("");
                        },
                    },
                );
            }}
        >
            <Textarea
                className="w-full resize-none rounded-2xl border border-gray-200 bg-white p-3 pr-16 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none"
                placeholder="Type your message..."
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <Button
                className="hover:bg-primary-500 absolute right-3 top-3 rounded-full bg-primary p-2 text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                size="icon"
                type="submit"
            >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
            </Button>
        </Form>
    );
};

const Chats = (props: { messages: TMessage[]; user: TUser; onMinimize: () => void }) => {
    return (
        <Card className="fixed bottom-10 right-6 z-[999] w-[350px] overflow-hidden rounded-2xl shadow-lg transition-transform duration-500">
            <CardHeader className="flex flex-row items-center justify-between bg-gray-100 px-4 py-3">
                <h3 className="text-xl font-bold">Chat with Us</h3>
                <Button
                    onClick={props.onMinimize}
                    className="rounded-full"
                    size="icon"
                    variant="ghost"
                >
                    <Minimize2 />
                    <span className="sr-only">Minimize</span>
                </Button>
            </CardHeader>
            <CardContent className="flex h-[350px] flex-col-reverse overflow-y-auto px-4 py-3">
                {!!props.messages?.length ? (
                    <Messages data={props.messages} user={props.user} />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center text-accent-foreground">
                        There is no message
                    </div>
                )}
            </CardContent>
            <CardFooter className="w-full  bg-gray-100 px-4 py-3">
                <AddChat user_id={props.user?.id} />
            </CardFooter>
        </Card>
    );
};

const ChatIcon = (props: { onMaximize: () => void }) => {
    return (
        <div className="fixed bottom-10 right-6 z-[999]">
            <div className="flex items-center gap-2">
                <span
                    className="cursor-pointer rounded-2xl bg-white px-3 py-2 text-lg shadow-2xl"
                    onClick={props.onMaximize}
                >
                    Chat with US
                </span>{" "}
                <MessageCircleMore
                    className="h-12 w-12 cursor-pointer text-primary"
                    onClick={props.onMaximize}
                />
            </div>
        </div>
    );
};

const ChatBox = () => {
    const href = window.location.href;
    const show = !!url.getQueries(href)?.chat;

    const page = usePage<TProps>();
    const user = page.props.auth.user;

    if (show && !user) {
        window.location.href = route("login");
        return;
    }

    const navigate = useCallback(
        (href: string) => {
            router.get(href, {}, { preserveScroll: true, preserveState: true });
        },
        [router],
    );

    return show && user ? (
        <Chats
            user={user}
            messages={page.props.auth.messages}
            onMinimize={() => navigate(url.replaceQueries(href, { chat: undefined }))}
        />
    ) : (
        <ChatIcon onMaximize={() => navigate(url.replaceQueries(href, { chat: "true" }))} />
    );
};

export default ChatBox;
