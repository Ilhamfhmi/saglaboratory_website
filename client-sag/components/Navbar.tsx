"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Study Group', href: '/study-group' },
    { name: 'Research', href: '/research' },
  ];

  return (
    <>
      {/* ── NAVBAR BAR ── */}
      <nav className="bg-white/95 backdrop-blur-md text-gray-800 shadow-sm fixed w-full top-0 z-[100] h-20 flex items-center font-jakarta">
        <div className="w-full px-5 md:px-8 flex justify-between items-center">

          {/* ── LOGO ── */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="relative w-20 h-10 sm:w-28 sm:h-12 md:w-32 md:h-14 transition-transform duration-300 group-hover:scale-105">
              <Image src="/logo-sag.png" alt="SAG Laboratory" fill className="object-contain object-left" priority />
            </div>
            <div className="h-7 w-px bg-gray-200 hidden sm:block" />
            <div className="relative w-14 h-9 sm:w-18 sm:h-10 md:w-20 md:h-12 hidden sm:block transition-transform duration-300 group-hover:scale-105">
              <Image src="/logo-isg2.png" alt="ISG Telkom University" fill className="object-contain object-left" priority />
            </div>
          </Link>

          {/* ── DESKTOP MENU ── */}
          <div className="hidden md:flex items-center bg-gray-100/50 border border-gray-200/50 p-1 rounded-full">
            <div className="flex items-center uppercase tracking-widest text-[10px] font-black">
              {menuItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-5 py-2 transition-colors duration-300 rounded-full z-10 ${isActive ? "text-white" : "text-gray-500 hover:text-sag-blue"
                      }`}
                  >
                    <span className="relative z-20">{item.name}</span>
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

          {/* ── DESKTOP LOGIN ── */}
          <div className="hidden md:block flex-shrink-0">
            <Link
              href="/login"
              className="bg-sag-blue text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-md text-sm active:scale-95"
            >
              Login
            </Link>
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            className="md:hidden z-[110] p-2 -mr-1 text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-[18px] flex flex-col justify-between">
              <span className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${isOpen ? 'rotate-45 w-[calc(100%+2px)]' : ''}`} />
              <span className={`block w-4 h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-2' : ''}`} />
              <span className={`block w-full h-0.5 bg-current rounded-full transition-all duration-300 origin-left ${isOpen ? '-rotate-45 w-[calc(100%+2px)]' : ''}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 z-[98] md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer panel — slides down from top */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-20 left-0 right-0 z-[99] md:hidden bg-white border-b border-gray-100 shadow-xl rounded-b-3xl overflow-hidden"
            >
              {/* Menu items */}
              <div className="px-6 pt-4 pb-2">
                {menuItems.map((item, i) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between py-4 border-b border-gray-50 last:border-0 transition-colors group ${isActive ? "text-sag-blue" : "text-gray-600 hover:text-sag-blue"
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-sag-blue flex-shrink-0" />
                          )}
                          <span className={`text-base font-black uppercase tracking-tight ${!isActive ? 'ml-[18px]' : ''}`}>
                            {item.name}
                          </span>
                        </div>
                        <svg
                          className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isActive ? 'text-sag-blue' : 'text-gray-300'}`}
                          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Login button */}
              <div className="px-6 py-5 bg-gray-50/50">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-sag-blue text-white py-3.5 rounded-2xl font-black text-[11px] text-center uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 hover:bg-blue-800 transition-all active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login to Admin
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}