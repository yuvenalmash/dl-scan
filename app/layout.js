import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DL Scanner",
  description: "Scans driving licenses and extracts information",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " flex flex-col h-screen"}>
        <header className="sticky top-0 z-50 h-auto">
          <Navbar />
        </header>
        <main className="relative z-0 flex-grow flex-col w-full items-center justify-between p-12 sm:p-24">
          {children}
        </main>
      </body>
    </html>
  );
}
