import type { Metadata } from "next";
import { Inter, Architects_Daughter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import ContextProvider from "@/context/wagmi-provider";
import { headers } from "next/headers";
import ScrollbarSize from "@/components/scrollbar-size";
import OrbitalAnimation from "@/components/orbital-animation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const handwriting = Architects_Daughter({ 
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-handwriting"
});

export const metadata: Metadata = {
  title: "Underfi",
  description: "Underfi finance application",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const cookies = headersList.get("cookie");

  return (
    <html lang="en">
      <body className={`${inter.variable} ${handwriting.variable} antialiased`}>
        <OrbitalAnimation />
        <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <ContextProvider cookies={cookies}>
            <ScrollbarSize />
            <Navbar />
            {children}
          </ContextProvider>
        </div>
      </body>
    </html>
  );
}
