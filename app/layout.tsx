import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "BlogApp",
  description: "Discover and share insightful articles about technology, design, and business.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} h-full antialiased`}
    >
      <body className="bg-white capitalize relative">
        <Header />
        {children}
        </body>
    </html>
  );
}
