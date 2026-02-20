import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ThemeProvider } from "@/lib/theme-context";
import { ClientOnlyComponents } from "@/components/layout/ClientOnlyComponents";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "optional",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-outfit",
  display: "optional",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "MeetOnChai Studio | Web, App & AI Development",
    template: "%s | MeetOnChai Studio",
  },
  description:
    "Premium web development, mobile apps, AI solutions, and UI/UX design. We build MVPs, internal tools, chatbots, and scalable products that survive real users.",
  keywords: [
    "web development",
    "mobile app development",
    "AI development",
    "chatbot development",
    "UI/UX design",
    "MVP development",
    "Next.js development",
    "React Native",
    "conversational AI",
    "custom software development",
  ],
  authors: [{ name: "MeetOnChai Studio" }],
  creator: "MeetOnChai Studio",
  publisher: "MeetOnChai Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "MeetOnChai Studio | Web, App & AI Development",
    description:
      "Premium web development, mobile apps, AI solutions, and UI/UX design. We build MVPs, internal tools, chatbots, and scalable products.",
    siteName: "MeetOnChai Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MeetOnChai Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MeetOnChai Studio | Web, App & AI Development",
    description:
      "Premium web development, mobile apps, AI solutions, and UI/UX design. We build MVPs, internal tools, chatbots, and scalable products.",
    images: ["/og-image.png"],
    creator: "@meetonchai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  const effectiveTheme = theme === 'system'
                    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
                    : theme;
                  document.documentElement.setAttribute('data-theme', effectiveTheme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <GoogleAnalytics />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <SkipToContent />
          <ToastProvider>
            <ClientOnlyComponents />
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
