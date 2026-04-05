import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LayoutContent from "./LayoutContent";
import NextTopLoader from 'nextjs-toploader'; 

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
    // Tambahkan suppressHydrationWarning di sini agar extension browser tidak bikin error
    <html lang="en" suppressHydrationWarning> 
      <body className={`${jakarta.className} antialiased`}>
        <NextTopLoader 
          color="#2563eb" 
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false} 
          easing="ease"
          speed={200}
          shadow="0 0 10px #2563eb,0 0 5px #2563eb"
        />
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}