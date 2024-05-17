import { Toaster } from "@/components/ui/sonner";
import { ArrowRight } from "lucide-react";
import { MaxWidthWrapper } from "@/components/misc";
import { Button, buttonVariants } from "@/components/ui/button";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { PageProps, User } from "@/types";
import { ReactNode } from "react";

const Navbar = (props: { user: User }) => {
    const user = props.user;
    const isAdmin = true;

    return (
        <nav className="sticky inset-x-0 top-0 z-[100] h-14 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                    <Link href="/" className="z-40 flex font-semibold">
                        case<span className="text-green-600">cobra</span>
                    </Link>

                    <div className="flex h-full items-center space-x-4">
                        {user ? (
                            <>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => router.post("/logout")}
                                >
                                    Sign out
                                </Button>
                                {isAdmin ? (
                                    <Link
                                        href="/dashboard"
                                        className={buttonVariants({
                                            size: "sm",
                                            variant: "ghost",
                                        })}
                                    >
                                        Dashboard ✨
                                    </Link>
                                ) : null}
                                <Link
                                    href="/create-case/upload"
                                    className={buttonVariants({
                                        size: "sm",
                                        className: "hidden items-center gap-1 sm:flex",
                                    })}
                                >
                                    Create case
                                    <ArrowRight className="ml-1.5 h-5 w-5" />
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/register"
                                    className={buttonVariants({
                                        size: "sm",
                                        variant: "ghost",
                                    })}
                                >
                                    Sign up
                                </Link>

                                <Link
                                    href="/login"
                                    className={buttonVariants({
                                        size: "sm",
                                        variant: "ghost",
                                    })}
                                >
                                    Login
                                </Link>

                                <div className="hidden h-8 w-px bg-zinc-200 sm:block" />

                                <Link
                                    href="/create-case/upload"
                                    className={buttonVariants({
                                        size: "sm",
                                        className: "hidden items-center gap-1 sm:flex",
                                    })}
                                >
                                    Create case
                                    <ArrowRight className="ml-1.5 h-5 w-5" />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

const Footer = () => {
    return (
        <footer className="relative h-20 bg-white">
            <MaxWidthWrapper>
                <div className="border-t border-gray-200" />

                <div className="flex h-full flex-col items-center justify-center md:flex-row md:justify-between">
                    <div className="pb-2 text-center md:pb-0 md:text-left">
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} All rights reserved
                        </p>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="flex space-x-8">
                            <Link
                                href="#"
                                className="text-sm text-muted-foreground hover:text-gray-600"
                            >
                                Terms
                            </Link>
                            <Link
                                href="#"
                                className="text-sm text-muted-foreground hover:text-gray-600"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="#"
                                className="text-sm text-muted-foreground hover:text-gray-600"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>
    );
};

const Layout = (props: { children: ReactNode; title: string }) => {
    const page = usePage<PageProps>();
    return (
        <div>
            <Head title={props.title} />
            <Navbar user={page.props.auth.user} />
            <main className="grainy-light flex min-h-[calc(100vh-3.5rem-1px)] flex-col">
                <div className="flex h-full flex-1 flex-col">{props.children}</div>
                <Footer />
            </main>
            <Toaster position="top-right" />
        </div>
    );
};

export default Layout;
