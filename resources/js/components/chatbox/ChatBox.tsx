import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircleMore, Minimize2 } from "lucide-react";
import { useState } from "react";

const SendIcon = (props: any) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
        </svg>
    );
}

const Chats = (props: { onMinimize: () => void }) => {
    return (
        <Card className="fixed bottom-4 right-4 z-[999] w-[400px] overflow-hidden rounded-2xl shadow-lg">
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
            <CardContent className="h-[400px] overflow-y-auto px-4 py-3">
                <div className="flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 shrink-0 border">
                            <AvatarImage alt="Agent" src="/placeholder-user.jpg" />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg bg-gray-100 p-3 text-sm">
                            <p>Hi there! How can I assist you today?</p>
                        </div>
                    </div>
                    <div className="flex flex-row-reverse items-start gap-3">
                        <Avatar className="h-8 w-8 shrink-0 border">
                            <AvatarImage alt="User" src="/placeholder-user.jpg" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg bg-primary p-3 text-sm text-white">
                            <p>I'm looking for a new pair of shoes for my upcoming trip.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 shrink-0 border">
                            <AvatarImage alt="Agent" src="/placeholder-user.jpg" />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg bg-gray-100 p-3 text-sm">
                            <p>
                                Great! We have a wide selection of comfortable and stylish shoes
                                perfect for travel. Let me know if you have any specific
                                requirements, and I'd be happy to provide some recommendations.
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="w-full  bg-gray-100 px-4 py-3">
                <div className="relative w-full">
                    <Textarea
                        className="w-full resize-none rounded-2xl border border-gray-200 bg-white p-3 pr-16 text-sm shadow-sm transition-colors focus:border-primary focus:outline-none"
                        placeholder="Type your message..."
                    />
                    <Button
                        className="hover:bg-primary-500 absolute right-3 top-3 rounded-full bg-primary p-2 text-white shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        size="icon"
                        type="submit"
                    >
                        <SendIcon className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

const ChatIcon = (props: { onMaximize: () => void }) => {
    return (
        <div className="fixed bottom-10 right-6 z-[999]" onClick={props.onMaximize}>
            <div className="flex items-center gap-2">
                <span className="rounded-2xl bg-white px-3 py-2 text-lg shadow-2xl">
                    Chat with US
                </span>{" "}
                <MessageCircleMore className="h-12 w-12 text-primary" />
            </div>
        </div>
    );
};

const ChatBox = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            {" "}
            {show ? (
                <Chats onMinimize={() => setShow(false)} />
            ) : (
                <ChatIcon onMaximize={() => setShow(true)} />
            )}
        </>
    );
};

export default ChatBox;
