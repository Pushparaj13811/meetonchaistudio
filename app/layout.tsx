import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CursorDot } from "@/components/ui/CursorDot";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meet on Chai",
  description:
    "A small product studio. We build web and mobile software by talking things through properly — before committing to a single line of code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
          <CursorDot />
          {children}
        </body>
    </html>
  );
}
