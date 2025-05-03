import "./globals.css";
import React from "react";
import { Noto_Sans } from "next/font/google";
import { WebSocketProvider } from "../components/WebSocketContext";

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
      <body
          className={notoSans.className}
      >
        <WebSocketProvider>
        {children}
        </WebSocketProvider>
      </body>

    </html>
  );
}
