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
      <body className={inter.className}>
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main className="relative z-0 flex flex-col items-center justify-between p-24">
          {children}
        </main>
      </body>
    </html>
  );
}
