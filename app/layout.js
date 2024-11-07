import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SupabaseProvider from "@/components/providers/SupabaseProvider";
import { ThemeProvider } from "@/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PeerMetals - Premium Marketplace for Precious Metals",
  description:
    "Discover and trade premium precious metals with verified sellers",
  manifest: "/manifest.json",
  themeColor: "#FFD700",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PeerMetals",
  },
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="theme-color" content="#FFD700" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <SupabaseProvider>
            <Header />
            {children}
            <Footer />
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
