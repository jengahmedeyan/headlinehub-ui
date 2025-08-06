import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ConsentManager from "@/components/disclaimer/consent-manager";
import { ProviderWrapper } from "@/providers/provider-wrapper";

export const metadata: Metadata = {
  title: "Headline Hub",
  keywords: [
    "Gambia",
    "News",
    "Aggregator",
    "Newspaper",
    "Standards",
    "Kerr Fatou",
  ],
  description:
    "The Gambia's News Aggregator for the latest updates on politics, sports, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <ProviderWrapper>
          {children}
          <Analytics />
          <ConsentManager />
        </ProviderWrapper>
      </body>
    </html>
  );
}
