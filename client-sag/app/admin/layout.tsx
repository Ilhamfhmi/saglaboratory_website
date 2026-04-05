"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("sag_token");
    if (!token) router.push("/login");
  }, [router]);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
    )},
    { name: "Research", path: "/admin/research", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
    )},
    { name: "Events", path: "/admin/events", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    )},
    { name: "Study Group", path: "/admin/study-group", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
    )},
  ];

  const handleLogout = () => {
    localStorage.removeItem("sag_token");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-jakarta text-sag-blue">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col fixed h-full z-30 shadow-sm">
        
        {/* Branding Section */}
        <div className="p-10 pb-8 flex flex-col items-start">
          {/* Logo SAG - Digeser ke kanan sedikit dengan ml-2 */}
          <div className="relative w-35 h-35 ml-2 -mb-4 filter drop-shadow-sm">
              <Image 
                 src="/logo-sag.png" 
                 alt="SAG Logo" 
                 fill 
                 className="object-contain object-left"
                 priority 
              />
          </div>
          
          {/* Teks di bawah logo - Margin disesuaikan agar sejajar visual dengan logo */}
          <div className="space-y-1 mt-2 ml-2">
            <h1 className="text-xl font-black tracking-tighter leading-none">SAG ADMIN</h1>
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Laboratory Portal</span>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Separator Tipis */}
        <div className="px-10 mb-6">
            <div className="w-full h-px bg-gray-100/80"></div>
        </div>

        {/* Menu Navigasi */}
        <nav className="flex-grow px-4 space-y-1.5">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm transition-all group ${
                pathname === item.path 
                ? "bg-sag-blue text-white shadow-xl shadow-blue-100/50" 
                : "text-gray-400 hover:bg-gray-50 hover:text-sag-blue"
              }`}
            >
              <span className={`${pathname === item.path ? "text-white" : "text-gray-400 group-hover:text-sag-blue"}`}>
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Logout Section */}
        <div className="p-8 mt-auto">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm text-red-500 bg-red-50/50 hover:bg-red-50 hover:shadow-sm transition-all border border-red-100/50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout Account
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-10 bg-[#F8FAFC]">
        {children}
      </main>
    </div>
  );
}