"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion'; // Import Framer Motion

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Event', href: '/event' },
    { name: 'Study Group', href: '/study-group' },
    { name: 'Research', href: '/research' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md text-gray-800 py-3 px-8 shadow-sm fixed w-full top-0 z-[100] transition-all h-20 flex items-center font-jakarta">
      <div className="container mx-auto flex justify-between items-center relative h-full">
        
        {/* LOGO SECTION */}
        <div className="flex-shrink-0 flex items-center z-[110]">
          <Link href="/" className="group relative">
            <div className="absolute -top-12 left-0 w-28 h-28 md:w-36 md:h-36 transition-transform duration-300 group-hover:scale-110 drop-shadow-2xl">
              <Image 
                src="/logo-sag.png" 
                alt="SAG Laboratory Logo"
                fill
                className="object-contain"
                priority  
              />
            </div>
            <div className="w-28 h-10 md:w-36 md:h-12"></div>
          </Link>
        </div>

        {/* DESKTOP MENU (Tengah) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center bg-gray-100/50 border border-gray-200/50 p-1 rounded-full overflow-hidden">
          <div className="flex items-center relative uppercase tracking-widest text-[10px] font-black">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className={`relative px-5 py-2 transition-colors duration-300 rounded-full z-10 ${
                    isActive ? "text-white" : "text-gray-500 hover:text-sag-blue"
                  }`}
                >
                  {/* Teks Menu */}
                  <span className="relative z-20">{item.name}</span>
                  
                  {/* Efek Rounded Biru yang Menggeser */}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-sag-blue rounded-full z-10 shadow-lg shadow-blue-200"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* LOGIN SECTION */}
        <div className="hidden md:block flex-shrink-0 z-[110]">
          <Link 
            href="/login" 
            className="bg-sag-blue text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-md text-sm active:scale-95"
          >
            Login
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button 
          className="md:hidden z-[110] p-2 text-gray-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* MOBILE OVERLAY */}
        <div className={`fixed inset-0 bg-white/98 backdrop-blur-xl z-[100] flex flex-col items-center justify-center space-y-8 transition-all duration-500 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-black transition-colors tracking-tighter uppercase relative ${
                  isActive ? "text-sag-blue" : "text-gray-800"
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div 
                    layoutId="activeUnderlineMobile"
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-sag-blue rounded-full"
                  />
                )}
              </Link>
            );
          })}
          <Link 
            href="/login" 
            onClick={() => setIsOpen(false)}
            className="bg-sag-blue text-white px-12 py-4 rounded-2xl font-bold shadow-lg text-lg"
          >
            Login
          </Link>
        </div>

      </div>
    </nav>
  );
}