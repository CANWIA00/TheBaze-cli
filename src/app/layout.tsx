import "./globals.css";
import React from "react";
import { Noto_Sans } from "next/font/google";
import { WebSocketProvider } from "../components/WebSocketContext";
import { ProfileProvider } from "../components/context/ProfileProvider";
import CallSignalListener from "../components/userChat/CallSignalListener";

const notoSans = Noto_Sans({
    subsets: ["latin"],
    weight: ["100", "400", "700"],
    variable: "--font-noto-sans",
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={notoSans.className}>
        <WebSocketProvider>
            <ProfileProvider>
                {children}
                <CallSignalListener />
            </ProfileProvider>
        </WebSocketProvider>
        </body>
        </html>
    );
}
