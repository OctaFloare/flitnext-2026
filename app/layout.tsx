import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { ContentLayout } from "@/components/content-layout";
import { ReactQueryProvider } from "@/components/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flitnext",
  description: "Video streaming app for summer practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased w-full`}
    >
      <body className="min-h-full flex flex-col">
        <ReactQueryProvider>
          <Navbar />
            <ContentLayout>
              {children}
            </ContentLayout>
          </ReactQueryProvider>
        </body>
    </html>
  );
}
