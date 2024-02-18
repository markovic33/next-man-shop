import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionProvider  from "../components/SessionProvider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Man Shop",
  description: "Best items for man's",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <SessionProvider>
        <Navbar />
        <main className="w-full p-2 m-auto min-w-[300px] ">{children}</main>
        <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
