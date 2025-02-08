import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import CartContextProvider from "./contexts/CartContextProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarApp from "@/components/sideBarApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SimpleCommerce",
  description: "Shop here, not there, cause here is better than there",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}antialiased overflow-x-hidden w-full font-[family-name:var(--font-geist-sans)]`}
      >
        <CartContextProvider>
          <SidebarProvider defaultOpen={false}>

            <SidebarApp side="left" />
            <Header />
            {children}
          </SidebarProvider>
        </CartContextProvider>
      </body>
    </html>
  );
}
