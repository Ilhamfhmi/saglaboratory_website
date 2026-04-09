"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

// ─── Constants (Core Competencies) ───────────────────────────────────────────

const STUDY_ROLES = [
  {
    title: "Enterprise Architecture",
    description: "Designing structural blueprints that align business strategy with IT infrastructure.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="8" y1="14" x2="16" y2="14" />
      </svg>
    ),
  },
  {
    title: "Business Process",
    description: "Mapping and optimizing end-to-end workflows to improve efficiency and organizational performance.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="6" height="5" rx="1" />
        <rect x="16" y="3" width="6" height="5" rx="1" />
        <rect x="9" y="16" width="6" height="5" rx="1" />
        <path d="M5 8v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" />
        <line x1="12" y1="12" x2="12" y2="16" />
      </svg>
    ),
  },
  {
    title: "IT Governance",
    description: "Establishing frameworks and policies that ensure IT investments align with business goals and compliance.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-4 9-8 10C8 21 4 17 4 12V6l8-4z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

const SLIDES = [
  "/kegiatan1.jpg",
  "/kegiatan2.png",
  "/kegiatan3.jpg",
  "/kegiatan4.png",
];

const MARQUEE_ITEMS = [
  "SAG Laboratory",
  "Education",
  "SAG Study Group",
  "Cobit",
  "ISG Telkom University",
  "Isaca",
];

const PARTNERS = [
  { name: "FRI Telkom University", logo: "/logo-fri.png", delay: 100, isLarge: true },
  { name: "ISG Telkom University", logo: "/logo-isg2.png", delay: 200, isLarge: false },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowIcon({ className = "" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function SliderArrowIcon({ direction }) {
  return direction === "left" ? (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [research, setResearch] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const nextSlide = () => setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
    fetchDatabaseData();
    const timer = setInterval(nextSlide, 10000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const fetchDatabaseData = async () => {
    try {
      const baseUrl = "http://localhost:8000/api";
      const [resR, resE] = await Promise.all([
        fetch(`${baseUrl}/research`),
        fetch(`${baseUrl}/events`)
      ]);

      const dataR = await resR.json();
      const dataE = await resE.json();

      setResearch(Array.isArray(dataR) ? dataR.slice(0, 3) : []);
      setEvents(Array.isArray(dataE) ? dataE.slice(0, 3) : []);
    } catch (err) {
      console.error("Gagal sinkronisasi database:", err);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (url: string) => {
    if (!url) return "/logo-sag.png";
    return url.startsWith('http') ? url : `http://localhost:8000/storage/${url}`;
  };

  return (
    <div className="min-h-screen bg-white font-jakarta overflow-x-hidden text-sag-blue text-left">

      {/* ── SECTION 1: HERO ── */}
      <section className="min-h-screen bg-sag-blue flex items-center px-6 md:px-24 pt-20 relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-white/5 skew-x-12 translate-x-32 hidden lg:block" />
        <div className="container mx-auto z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-3xl order-2 lg:order-1 lg:-mt-10 relative z-20">
            <div data-aos="fade-down" data-aos-delay="100" className="inline-block mb-8 md:mb-12 relative group">
              <div className="backdrop-blur-2xl bg-white/10 border border-white/20 py-3 px-6 md:px-8 rounded-full flex items-center shadow-2xl transition-all hover:bg-white/15">
                <span className="text-blue-200 text-[9px] md:text-[11px] font-bold tracking-[0.3em] uppercase opacity-90 mr-5">In Collaboration With</span>
                <div className="h-6 w-[1px] bg-white/20 mr-5" />
                <div className="relative">
                  <div className="absolute -top-4 -bottom-7 -right-5 w-16 h-16 md:w-20 md:h-20 transition-transform duration-500 group-hover:scale-110 drop-shadow-xl">
                    <Image src="/logo-isg2.png" alt="Logo ISG" fill className="object-contain" priority />
                  </div>
                  <div className="w-12 h-7 md:w-14 md:h-8" />
                </div>
              </div>
            </div>
            <h1 data-aos="fade-up" data-aos-delay="300" className="text-white text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-tight md:leading-none mb-6 md:mb-10 uppercase">
              SAG <span className="text-blue-400">LABORATORY</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="500" className="text-blue-100 text-lg md:text-2xl max-w-2xl leading-relaxed mb-10 md:mb-16 font-medium opacity-90">
              Empowering students to plan, design, and align information systems that drive real business impact.
              <span className="text-white block mt-5 font-semibold">"Bridging systems engineering with strategic IT governance."</span>
            </p>
            <div data-aos="fade-up" data-aos-delay="700" className="flex flex-col sm:flex-row gap-4 md:gap-6 font-bold relative z-30">
              <Link href="/research" className="group/btn relative px-8 md:px-12 py-4 md:py-5 bg-white text-sag-blue rounded-2xl overflow-hidden hover:bg-blue-50 transition-all duration-500 shadow-xl hover:-translate-y-2 active:scale-95 flex items-center justify-center gap-3 text-base md:text-lg uppercase tracking-wider">
                Explore Research <ArrowIcon className="transition-transform duration-500 group-hover/btn:translate-x-2" />
              </Link>
              <Link href="/about" className="px-8 md:px-12 py-4 md:py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl hover:bg-white/20 transition-all duration-500 shadow-lg hover:-translate-y-2 active:scale-95 text-base md:text-lg uppercase tracking-wider text-center">
                About Our Lab
              </Link>
            </div>
          </div>
          <div className="relative group flex justify-center lg:justify-center order-1 lg:order-2 z-10">
            <div className="relative p-2 md:p-4 rounded-[2.5rem] md:rounded-[3.5rem] bg-white/5 border border-white/20 backdrop-blur-sm shadow-2xl w-full lg:max-w-[600px] aspect-[16/11] overflow-hidden group/slider">
              <div className="relative w-full h-full rounded-[2rem] md:rounded-[2.8rem] overflow-hidden bg-gray-900/20">
                <div className="flex w-full h-full transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {SLIDES.map((src, index) => (
                    <div key={index} className="relative w-full h-full flex-shrink-0">
                      <Image src={src} alt={`Activity ${index + 1}`} fill className="object-cover" priority={index === 0} />
                    </div>
                  ))}
                </div>
                <button onClick={prevSlide} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-white/20 z-30 duration-500">
                  <SliderArrowIcon direction="left" />
                </button>
                <button onClick={nextSlide} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-white/20 z-30 duration-500">
                  <SliderArrowIcon direction="right" />
                </button>
              </div>
              <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-2 md:space-x-3 z-20 bg-black/10 backdrop-blur-md px-4 py-2 rounded-full">
                {SLIDES.map((_, index) => (
                  <button key={index} onClick={() => setCurrentSlide(index)} className={`h-1.5 transition-all duration-700 rounded-full ${index === currentSlide ? "w-6 md:w-8 bg-white" : "w-2 bg-white/30"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="relative bg-sag-blue overflow-hidden py-6 md:py-10 z-20 border-y border-white/10 text-left">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl" />
        <div className="relative z-10 flex animate-marquee whitespace-nowrap items-center text-left">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center text-left">
              {MARQUEE_ITEMS.map((item, index) => (
                <div key={index} className="flex items-center text-left">
                  <span className="text-white text-lg md:text-2xl font-black uppercase tracking-tighter px-8 md:px-12 opacity-90">{item}</span>
                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-green-400 rounded-full shadow-[0_0_20px_rgba(74,222,128,1)]" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: SAG STUDY GROUP (CORE COMPETENCIES) ── */}
      <section className="py-24 md:py-40 px-6 md:px-24 bg-gradient-to-b from-white via-blue-50/50 to-blue-100/30 relative overflow-hidden text-left">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="container mx-auto relative z-10 text-left">
          <div className="max-w-4xl mb-16 md:mb-24 text-left">
            <h2 data-aos="fade-up" className="text-sag-blue text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-none uppercase">
              SAG <span className="text-blue-600">Study Group</span>
            </h2>
            <p data-aos="fade-up" data-aos-delay="200" className="text-gray-600 text-lg md:text-2xl leading-relaxed max-w-3xl font-medium mb-12 opacity-80">
              The program is focused on three key areas to empower students with strategic technical skills:
              <span className="text-sag-blue font-extrabold underline decoration-blue-200 decoration-4 underline-offset-4"> Enterprise Architecture, Business Process, and IT Governance.</span>
            </p>
            <Link href="/study-group" className="group/join relative inline-flex px-8 md:px-10 py-4 bg-sag-blue text-white rounded-2xl overflow-hidden hover:bg-blue-800 transition-all duration-700 shadow-xl hover:-translate-y-2 active:scale-95 items-center justify-center gap-3 text-base md:text-lg font-bold uppercase tracking-wider">
              Join Study Group <ArrowIcon className="transition-transform duration-500 group-hover/join:translate-x-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {STUDY_ROLES.map((role, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={100 * (i + 1)} className="p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-white border border-blue-100/50 hover:border-blue-400 group shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 text-left">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-700 shadow-lg shadow-blue-100">
                  {role.icon}
                </div>
                <h3 className="text-sag-blue text-xl md:text-2xl font-black mb-6 uppercase tracking-tight">{role.title}</h3>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed font-medium">{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: RESEARCH (FROM DB) ── */}
      <section className="py-24 md:py-40 px-6 md:px-24 bg-white relative overflow-hidden text-left">
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8 text-left">
            <div className="text-left">
              <h2 data-aos="fade-right" className="text-sag-blue text-4xl md:text-7xl font-black tracking-tighter mb-6 leading-none uppercase">
                Latest <span className="text-blue-600">Research</span>
              </h2>
              <p data-aos="fade-right" data-aos-delay="200" className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-xl opacity-80">
                Exploring information systems strategy through our latest laboratory publications.
              </p>
            </div>
            <Link href="/research" className="group flex items-center gap-3 bg-white hover:bg-blue-50 text-sag-blue font-bold px-8 py-4 rounded-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 uppercase text-[10px] md:text-xs tracking-widest shadow-sm">
              Visit Research Hub <ArrowIcon className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {research.map((item: any, i) => (
              <Link href={`/research/${item.id}`} key={i} data-aos="fade-up" data-aos-delay={100 * i} className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-700 text-left">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img src={getImageUrl(item.image_url)} alt={item.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                </div>
                <div className="p-8 text-left">
                   <span className="bg-blue-50 text-blue-600 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Research Asset</span>
                   <h3 className="text-sag-blue text-xl font-black mt-4 mb-5 line-clamp-2 uppercase leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h3>
                   <div className="flex items-center gap-3 text-blue-600 font-black uppercase text-[10px] tracking-widest">
                      <span>Read Asset</span>
                      <ArrowIcon className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                   </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: EVENTS (FROM DB) ── */}
      <section className="py-24 md:py-40 px-6 md:px-24 bg-sag-blue relative overflow-hidden text-left text-white">
        <div className="container mx-auto relative z-10 text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
            <div className="text-left">
              <h2 data-aos="fade-right" className="text-white text-4xl md:text-7xl font-black tracking-tighter mb-6 uppercase leading-none">
                Featured <span className="text-blue-400">Events</span>
              </h2>
              <p data-aos="fade-right" data-aos-delay="200" className="text-blue-100/70 text-lg md:text-xl font-medium max-w-xl opacity-80">
                Connecting expertise and ambition through our flagship programs.
              </p>
            </div>
            <Link href="/events" className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl border border-white/20 uppercase text-[10px] tracking-widest backdrop-blur-md">
              View All Events <ArrowIcon className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event: any, i) => (
              <Link href={`/events/${event.id}`} key={i} data-aos="fade-up" className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:bg-white/10 transition-all flex flex-col h-full text-left">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={getImageUrl(event.image_url)} alt={event.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8 flex flex-col flex-grow text-left">
                   <h3 className="text-white text-2xl font-black mb-4 uppercase tracking-tighter group-hover:text-blue-300 transition-colors">{event.title}</h3>
                   <p className="text-blue-100/60 text-sm font-medium mb-8 line-clamp-3 leading-relaxed">{event.description}</p>
                   <div className="mt-auto flex items-center gap-3 text-blue-300 font-black uppercase text-[10px] tracking-[0.2em]">
                      Explore Detail <ArrowIcon />
                   </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: PARTNERS ── */}
      <section className="py-24 md:py-32 px-6 md:px-24 bg-gray-100 relative overflow-hidden text-center">
        <div className="container mx-auto relative z-10">
          <div data-aos="fade-up" className="mb-16">
            <h2 className="text-sag-blue text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4">Official <span className="text-blue-600">Partners</span></h2>
            <div className="w-16 md:w-20 h-1.5 bg-blue-600 mx-auto rounded-full" />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-32 opacity-70">
            {PARTNERS.map((partner, index) => (
              <div key={index} data-aos="fade-up" data-aos-delay={partner.delay} className="flex flex-col items-center group">
                <div className={`relative grayscale group-hover:grayscale-0 transition-all duration-500 hover:scale-110 mb-6 flex items-center justify-center ${partner.isLarge ? "w-48 h-24 md:w-64 md:h-32" : "w-32 h-16 md:w-40 md:h-20"}`}>
                  <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
                </div>
                <span className="text-sag-blue/60 text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-sag-blue transition-colors">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gradient-to-b from-white via-blue-50/50 to-blue-100/40 py-16 md:py-24 px-6 md:px-32 relative overflow-hidden border-t border-blue-100 text-left">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 text-left">
            <div className="flex flex-col items-start text-left">
              <div className="relative w-44 h-16 mb-6">
                <Image src="/logo-sag.png" alt="SAG Lab Logo" fill className="object-contain object-left" />
              </div>
              <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[320px] mb-10 text-left">Bridging systems engineering with strategic IT governance to drive digital transformation and organizational excellence.</p>
              <div className="flex items-center gap-4 text-left">
                {[
                  { label: "IG", url: "https://instagram.com/saglaboratory", svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /> },
                ].map((social, i) => (
                  <a key={i} href={social.url} target="_blank" className="w-10 h-10 rounded-full border border-blue-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-black-600 p-2.5 bg-white shadow-sm">
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">{social.svg}</svg>
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start text-left">
              <h4 className="text-sag-blue text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-40 text-left">Navigation</h4>
              <nav className="flex flex-col gap-5 text-sm font-bold tracking-widest text-left">
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors uppercase">Home</Link>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors uppercase">About</Link>
                <Link href="/study-group" className="text-blue-600 uppercase">Study Group</Link>
              </nav>
            </div>
            <div className="flex flex-col items-start text-left">
              <h4 className="text-sag-blue text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-40 text-left">Contact</h4>
              <p className="text-sag-blue font-black text-sm uppercase mb-3 text-left">SAG Laboratory</p>
              <p className="text-gray-500 text-sm font-medium leading-loose max-w-[300px] text-left">Jl. Telekomunikasi No.1, Bandung, Jawa Barat 40267</p>
              <a href="mailto:sag@telkomuniversity.ac.id" className="text-blue-600 font-bold text-sm border-b border-blue-600/20 hover:border-blue-600 pb-1 transition-all">sag@telkomuniversity.ac.id</a>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-blue-100 flex justify-center text-center">
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">© 2026 SAG Laboratory Telkom University. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}