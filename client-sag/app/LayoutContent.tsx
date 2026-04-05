"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Memeriksa apakah path saat ini adalah login atau dimulai dengan /admin
  // Dengan startsWith, semua sub-halaman admin otomatis tidak akan muncul Navbar
  const isNoNavbarPath = pathname === "/login" || pathname.startsWith("/admin");

  return (
    <>
      {/* Navbar hanya muncul jika bukan di halaman login atau admin */}
      {!isNoNavbarPath && <Navbar />}
      
      <main>{children}</main>
    </>
  );
}