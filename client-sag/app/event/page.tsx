"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

// ─── Constants ───────────────────────────────────────────────────────────────

const EVENTS_DATA = [
  {
    id: 1,
    category: "Flagship",
    title: "Kuliah Umum: IT Governance in Industry 5.0",
    date: "24 Mei 2026",
    image: "/kuliah-umum.png",
    status: "Past",
    desc: "Menghadirkan praktisi ahli untuk membahas implementasi COBIT dan ITIL di perusahaan global.",
    slug: "kuliah-umum-2026"
  },
  {
    id: 2,
    category: "Internal",
    title: "SAG Internal Competition",
    date: "12 Juni 2026",
    image: "/kegiatan1.jpg",
    status: "Past",
    desc: "Kompetisi pemodelan proses bisnis khusus untuk asisten dan trainee SAG Laboratory.",
    slug: "internal-competition"
  },
  {
    id: 3,
    category: "Well-being",
    title: "SAG Rehat Sejenak",
    date: "15 Maret 2026",
    image: "/Rehat-sejenak.png",
    status: "Past",
    desc: "Sesi relaksasi dan sharing session mengenai kesehatan mental di lingkungan akademik.",
    slug: "rehat-sejenak-1"
  }
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("Upcoming"); 
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      const matchesTab = event.status === activeTab;
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            event.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-white font-jakarta pt-20 overflow-x-hidden text-sag-blue">
      
      {/* ── SECTION 1: HERO ── */}
      <section className="py-24 md:py-36 px-6 md:px-24 bg-sag-blue text-white relative flex items-center justify-center text-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-blue-400/20 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto relative z-10 max-w-4xl">
          <h1 data-aos="zoom-in" className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            Our <span className="bg-gradient-to-br from-[#22D3EE] via-white to-[#22D3EE] bg-clip-text text-transparent drop-shadow-sm">Events</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="300" className="text-blue-100/70 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Stay updated with our latest activities and look back at our collective achievements and milestones.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: NAVIGATION & SEARCH ── */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-20 z-[50] backdrop-blur-md bg-white/90">
        <div className="container mx-auto px-6 md:px-24 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Tabs: Upcoming & Past */}
          <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto">
            {["Upcoming", "Past"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-none px-10 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab 
                  ? "bg-white text-sag-blue shadow-sm" 
                  : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab} Events
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <input 
              type="text"
              placeholder="Search event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-sag-blue"
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 3: EVENT GRID ── */}
      <section className="py-20 px-6 md:px-24 bg-gray-50/30 min-h-[600px]">
        <div className="container mx-auto">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredEvents.map((event, i) => (
                <div 
                  key={event.id} 
                  data-aos="fade-up" 
                  data-aos-delay={i * 100}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:border-blue-400 transition-all duration-500 hover:shadow-2xl flex flex-col h-full"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image 
                      src={event.image} 
                      alt={event.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                  </div>

                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest">{event.category}</span>
                      <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                      <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{event.date}</span>
                    </div>
                    
                    <h3 className="text-sag-blue text-2xl font-black uppercase tracking-tight mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm leading-relaxed font-medium mb-8 opacity-80">
                      {event.desc}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-50">
                      <Link 
                        href={`/events/${event.slug}`}
                        className="inline-flex items-center gap-3 text-sag-blue font-black uppercase tracking-widest text-[11px] group/link"
                      >
                        View Details
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover/link:bg-sag-blue group-hover/link:text-white transition-all duration-300 shadow-sm">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200 shadow-sm" data-aos="fade-up">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-300">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M8 11h6"/></svg>
              </div>
              <h3 className="text-sag-blue text-xl font-black uppercase tracking-tight mb-2">No Events Found</h3>
              <p className="text-gray-400 font-medium px-6">
                {activeTab === "Upcoming" 
                  ? "We're currently planning something big! Stay tuned for upcoming events." 
                  : "Try adjusting your search keywords."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gradient-to-b from-white via-blue-50/50 to-blue-100/40 py-16 md:py-24 px-6 md:px-32 relative overflow-hidden border-t border-blue-100">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 text-left">
            <div className="flex flex-col items-start text-left">
              <div className="relative w-44 h-16 mb-6">
                <Image src="/logo-sag.png" alt="SAG Lab Logo" fill className="object-contain object-left" />
              </div>
              <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[320px] mb-10 text-left">
                Bridging systems engineering with strategic IT governance to drive digital transformation and organizational excellence.
              </p>
            </div>
            <div className="flex flex-col items-start text-left">
              <h4 className="text-sag-blue text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-40 leading-none">Navigation</h4>
              <nav className="flex flex-col gap-5 text-sm font-bold tracking-widest text-left capitalize">
                <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
                <Link href="/study-group" className="hover:text-blue-600 transition-colors">Study group</Link>
                <Link href="/research" className="hover:text-blue-600 transition-colors">Research</Link>
                <Link href="/events" className="hover:text-blue-600 transition-colors">Events</Link>
              </nav>
            </div>
            <div className="flex flex-col items-start text-left">
              <h4 className="text-white text-xs font-black uppercase mb-10 opacity-0">.</h4>
              <div className="mb-8 text-left">
                <p className="text-sag-blue font-black text-sm uppercase mb-3 text-left">SAG Laboratory</p>
                <p className="text-gray-500 text-sm font-medium leading-loose max-w-[300px] text-left">
                  Jl. Telekomunikasi No.1, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40267
                </p>
              </div>
              <a href="mailto:sag@telkomuniversity.ac.id" className="text-blue-600 font-bold text-sm border-b border-blue-600/20 hover:border-blue-600 pb-1 transition-all">
                sag@telkomuniversity.ac.id
              </a>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-blue-100 flex justify-center text-gray-400 text-[10px] font-black uppercase tracking-widest text-center">
            © 2026 SAG Laboratory Telkom University. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}