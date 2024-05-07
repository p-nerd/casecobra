import "./globals.css";

import { type ReactNode } from "react";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import Navbar from "./Navbar";
import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Casecobra - Put your favorite photo to your phone case",
};

const Layout = (p: Readonly<{ children: ReactNode }>) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                <main className="flex min-h-[calc(100vh-3.5rem-1px)] flex-col">
                    <div className="flex h-full flex-1 flex-col">{p.children}</div>
                    <Footer />
                </main>
                <Toaster />
            </body>
        </html>
    );
};

export default Layout;
