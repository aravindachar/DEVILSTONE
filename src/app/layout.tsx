import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEVILSTONE - Fretboard & Academy",
  description: "Master your guitar fretboard and theory.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        {/* GPU-Accelerated Background Blobs */}
        <div className="bg-mesh-container">
          <div className="bg-blob blob-cyan" />
          <div className="bg-blob blob-purple" />
          <div className="bg-blob blob-amber" />
        </div>
        {children}
      </body>
    </html>
  );
}
