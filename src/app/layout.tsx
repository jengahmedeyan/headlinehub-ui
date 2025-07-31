import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";


export const metadata: Metadata = {
  title: "Headline Hub",
  keywords: ["Gambia", "News", "Aggregator", "Newspaper","Standards","Kerr Fatou"],
  authors: [{ name: "Ahmed Eyan Jeng" }],
  description: "The Gambia's News Aggregator for the latest updates on politics, sports, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
