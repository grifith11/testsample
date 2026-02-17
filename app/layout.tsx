import React from "react"
import type { Metadata } from "next";
import { Playfair_Display, Lora, Dancing_Script } from "next/font/google";
import { BackgroundMusicPlayer } from "@/components/background-music-player";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forever Yours",
  description: "A digital love letter to the one who holds my heart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${lora.variable} ${dancing.variable} font-serif antialiased`}
      >
        <BackgroundMusicPlayer />
        {children}
      </body>
    </html>
  );
}
