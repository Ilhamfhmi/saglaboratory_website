"use client";
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Event', href: '/event' },
    { name: 'Study Group', href: '/study-group' },
    { name: 'Research', href: '/research' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md text-gray-800 py-3 px-8 shadow-sm fixed w-full top-0 z-[100] transition-all h-20 flex items-center font-jakarta">
      <div className="container mx-auto flex justify-between items-center relative">
        
        {/* LOGO SECTION */}
        <Link href="/" className="group relative z-[110]">
          <div className="absolute -top-10 left-0 w-28 h-28 md:w-36 md:h-36 transition-transform duration-300 group-hover:scale-110 drop-shadow-2xl">
            <Image 
              src="/logo-sag.png" 
              alt="SAG Laboratory Logo"
              fill
              className="object-contain"
              priority  
            />
          </div>
          <div className="w-28 h-12 md:w-36 md:h-16"></div>
        </Link>

        {/* DESKTOP MENU (Muncul di Laptop/PC) */}
        <div className="hidden md:flex space-x-10 items-center font-bold text-[13px] tracking-widest uppercase">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="relative py-1 text-gray-500 hover:text-sag-blue transition-colors duration-300 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sag-blue transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <Link 
            href="/login" 
            className="bg-sag-blue text-white px-8 py-2.5 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-md text-sm ml-4"
          >
            Login
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON (Muncul hanya di HP) */}
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

        {/* MOBILE OVERLAY MENU (Slide Down) */}
        <div className={`fixed inset-0 bg-white/98 backdrop-blur-xl z-[100] flex flex-col items-center justify-center space-y-8 transition-all duration-500 md:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setIsOpen(false)}
              className="text-2xl font-black text-gray-800 hover:text-sag-blue transition-colors tracking-tighter uppercase"
            >
              {item.name}
            </Link>
          ))}
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