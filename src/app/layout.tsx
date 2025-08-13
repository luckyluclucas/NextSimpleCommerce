import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import CartContextProvider from "./contexts/CartContextProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarApp from "@/components/sideBarApp";
import { ThemeProvider } from "./contexts/themeProvider";
import { SessionProvider } from "next-auth/react";
import { Footer } from "@/components/footer";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden w-full font-[family-name:var(--font-geist-sans)]`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={true}
          >
            <CartContextProvider>
              <SidebarProvider defaultOpen={false}>
                <SidebarApp side="left" />
                <div className="flex flex-col w-full mx-auto">
                  <Header />
                  {children}
                  <Footer />
                </div>
              </SidebarProvider>
            </CartContextProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
