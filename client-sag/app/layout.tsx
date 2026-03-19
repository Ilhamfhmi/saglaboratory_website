import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // Ganti ke Plus Jakarta Sans
import "./globals.css";
import Navbar from "../components/Navbar";

// Konfigurasi Font
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800"] 
});

export const metadata: Metadata = {
  title: "SAG Laboratory | Official Website",
  description: "System Architecture & Governance Laboratory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Terapkan font ke seluruh body */}
      <body className={`${jakarta.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}