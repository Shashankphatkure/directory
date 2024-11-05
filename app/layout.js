import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SupabaseProvider from "@/components/providers/SupabaseProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PeerMetals.com",
  description: "Peer to peer precious metals marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <Header />
          {children}
          <Footer />
        </SupabaseProvider>
      </body>
    </html>
  );
}
