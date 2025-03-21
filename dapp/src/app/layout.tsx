import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Caudex } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CursorContainer from "@/components/ui/cursor-container";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caudex = Caudex({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-caudex',
});

export const metadata: Metadata = {
  title: "UnderFi - Zero Knowledge Lending",
  description: "Decentralized finance with privacy-preserving lending",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caudex.variable} font-caudex antialiased max-w-6xl  bg-gradient-to-r from-blue-50 to-indigo-100 mx-auto`}
      >
        <CursorContainer>
          <Navbar />
          {children}
          <Footer />
        </CursorContainer>
      </body>
    </html>
  );
}
