import type { Metadata } from "next";
import localFont from "next/font/local";
import "./global.css";
import ReduxProvider from "./provider";
import Link from "next/link";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Recommend to Watch",
  description: "Get recommendations for movies to watch!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <nav>
            <Link href="/">Home</Link>
            <Link href={"/about"}>About</Link>
          </nav>
        </header>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
