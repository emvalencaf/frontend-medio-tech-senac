import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// components
import Sidebar from "../components/Sidenav";

// providers
import ToasterProvider from "../providers/ToasterProvider";
import ModalProvider from "../providers/ModalProvider";
import { IHandleActionAnnouncement } from "../types/announcement";
import { createAnnouncement } from "../actions/announcements";
import { createClass, getAllByTeacher, getAllClasses } from "../actions/classes";
import { auth } from "../auth";
import { SessionProvider } from "next-auth/react";
import NotificationProvider from "../providers/NotificationProvider";
import { IHandleActionClass } from "../types/class";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    const handleActionsAnnouncement: IHandleActionAnnouncement = {
        handleActionCreate: async (data) => {
            "use server";
            return createAnnouncement(data);
        },
        handleActionGetClassesByTeacher: async (authorId) => {
            "use server";
            return getAllByTeacher(authorId);
        },
        handleActionGetAllClasses: async () => {
            "use server";
            return getAllClasses();
        },
    }

    const handleActionsClass: IHandleActionClass = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handleActionCreate: async (data: any) => {
            "use server";
            return createClass(data);
        },
    }

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
            >
                <SessionProvider session={session}>
                    <NotificationProvider />
                    <ModalProvider handleActionsAnnouncement={handleActionsAnnouncement} handleActionsClass={handleActionsClass} />
                    <ToasterProvider />
                    {session && <Sidebar />}
                    <main className="flex justify-center items-center w-full">
                        {children}
                    </main>
                </SessionProvider>
            </body>
        </html>
    );
}
