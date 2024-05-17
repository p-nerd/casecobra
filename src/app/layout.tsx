import "./globals.css";

import { type ReactNode } from "react";
import { type Metadata } from "next";
import { Recursive } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Providers from "./Providers";

const recuresive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Casecobra - Put your favorite photo to your phone case",
};

const Layout = (p: Readonly<{ children: ReactNode }>) => {
    return (
        <html lang="en">
            <body className={recuresive.className} suppressHydrationWarning={true}>
                <Navbar />
                <main className="grainy-light flex min-h-[calc(100vh-3.5rem-1px)] flex-col">
                    <div className="flex h-full flex-1 flex-col">
                        <Providers>{p.children}</Providers>
                    </div>
                    <Footer />
                </main>
                <Toaster />
            </body>
        </html>
    );
};

export default Layout;
