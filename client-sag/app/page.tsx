"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

// ─── Constants ───────────────────────────────────────────────────────────────

const MARQUEE_ITEMS = [
  "SAG Laboratory",
  "Education",
  "SAG Study Group",
  "Cobit",
  "ISG Telkom University",
  "Isaca",
];

const STUDY_GROUP_TOPICS = [
  {
    title: "Enterprise Architecture",
    description:
      "Designing structural blueprints that align business strategy with IT infrastructure.",
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
    description:
      "Mapping and optimizing end-to-end workflows to improve efficiency and organizational performance.",
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
    description:
      "Establishing frameworks and policies that ensure IT investments align with business goals and compliance.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-4 9-8 10C8 21 4 17 4 12V6l8-4z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

const RESEARCH_ARTICLES = [
  {
    image: "/business process.jpg",
    alt: "BPR Research",
    tag: "Business Process",
    title: "Mengenal Apa Itu Rekayasa Proses Bisnis (BPR)",
    excerpt:
      "Pendekatan strategis yang melibatkan pemikiran ulang secara fundamental untuk mencapai perbaikan dramatis dalam kinerja bisnis...",
    url: "https://medium.com/@SAGLaboratory/mengenal-apa-itu-rekayasa-proses-bisnis-business-process-reengineering-bpr-07ad971f253d",
    delay: 100,
  },
  {
    image: "/Togaf.jpg",
    alt: "EA Framework",
    tag: "Enterprise Architecture",
    title: "TOGAF, Zachman, FEAF: Framework EA Pilihan",
    excerpt:
      "Enterprise Architecture (EA) merupakan implementasi penting dalam mengelola struktur organisasi and infrastruktur IT...",
    url: "https://medium.com/@SAGLaboratory/togaf-zachman-feaf-framework-enterprise-architecture-yang-perlu-anda-tahu-95eb10d1b668",
    delay: 300,
  },
  {
    image: "/bpm.jpg",
    alt: "Business Modeling",
    tag: "BPM Strategy",
    title: "Pemodelan Proses Bisnis: Strategi Visual Efisien",
    excerpt:
      "Perusahaan tidak bisa lagi bergantung pada proses yang tidak efisien di tengah ketatnya persaingan bisnis global...",
    url: "https://medium.com/@SAGLaboratory/pemodelan-proses-bisnis-strategi-visual-menuju-organisasi-yang-efisien-dan-adaptif-660fb01e84a5",
    delay: 500,
  },
];

// ─── Interface ────────────────────────────────────────────────────────────────

interface EventItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  event_date: string;
  location: string;
  registration_link: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowIcon({ className = "" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function StudyGroupCard({ title, description, icon, index }) {
  return (
    <div className="p-12 rounded-[3.5rem] bg-white border border-blue-100/50 hover:border-blue-400 cursor-pointer group shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-700">
      <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-700 shadow-lg shadow-blue-100">
        {icon}
      </div>
      <h3 className="text-sag-blue text-2xl font-black mb-6 uppercase tracking-tight">{title}</h3>
      <p className="text-gray-500 text-lg leading-relaxed font-medium">{description}</p>
    </div>
  );
}

function ResearchCard({ image, alt, tag, title, excerpt, url, delay }) {
  return (
    <div data-aos="fade-up" data-aos-delay={delay} onClick={() => window.open(url, "_blank")} className="group flex flex-col h-full bg-white rounded-[2.5rem] border border-gray-100 hover:border-blue-200 transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image src={image} alt={alt} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-6 left-6">
          <span className="bg-white/95 backdrop-blur-md text-sag-blue text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-xl">{tag}</span>
        </div>
      </div>
      <div className="p-10 flex flex-col flex-grow text-left">
        <h3 className="text-sag-blue text-2xl font-black mb-5 group-hover:text-blue-600 transition-colors duration-500 leading-[1.2]">{title}</h3>
        <p className="text-gray-500 text-base leading-relaxed mb-8 line-clamp-3 font-medium opacity-80">{excerpt}</p>
        <div className="mt-auto flex items-center gap-3 text-blue-600 font-black uppercase tracking-widest text-[11px]">
          <span className="border-b-2 border-transparent group-hover:border-blue-600 pb-1 transition-all duration-500">Read Full Article</span>
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Event Card (Real Data) ───────────────────────────────────────────────────

function EventCard({ event, index }: { event: EventItem; index: number }) {
  const dotColors = ["bg-blue-400", "bg-green-400", "bg-purple-400"];
  const labelColors = ["text-blue-300", "text-green-300", "text-purple-300"];
  const dotColor = dotColors[index % dotColors.length];
  const labelColor = labelColors[index % labelColors.length];

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 200}
      className="group relative bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden hover:bg-white/10 transition-all duration-700 flex flex-col"
    >
      <div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
        <img
          src={event.image_url || "/placeholder.jpg"}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          onError={(e) => { (e.currentTarget.src = "/logo-sag.png"); }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sag-blue via-transparent to-transparent" />
      </div>
      <div className="p-10 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <span className={`w-2 h-2 ${dotColor} rounded-full animate-pulse`} />
          <span className={`${labelColor} text-[10px] font-black uppercase tracking-[0.2em]`}>
            {event.category}
          </span>
        </div>
        <h3 className="text-white text-3xl font-black mb-4 uppercase tracking-tighter leading-tight line-clamp-2">
          {event.title}
        </h3>
        <p className="text-blue-100/60 text-base leading-relaxed font-medium mb-2">
          {new Date(event.event_date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-blue-100/60 text-base leading-relaxed font-medium mb-8 line-clamp-2">
          {event.description}
        </p>
        <div className="mt-auto">
          <Link
            href={`/events/${event.id}`}
            className="group/btn flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300"
          >
            <span className="text-[11px] font-black uppercase tracking-widest border-b border-white/20 group-hover/btn:border-white pb-1 transition-all duration-300">
              View Article
            </span>
            <div className="w-8 h-8 rounded-full border border-white/20 group-hover/btn:border-white group-hover/btn:bg-white/10 flex items-center justify-center transition-all duration-300">
              <ArrowIcon className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Home() {
  const [featuredEvents, setFeaturedEvents] = useState<EventItem[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
    fetchFeaturedEvents();
  }, []);

  const fetchFeaturedEvents = async () => {
    try {
      setEventsLoading(true);
      const response = await fetch(`http://localhost:8000/api/events?t=${Date.now()}`, {
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      const data: EventItem[] = await response.json();

      // Ambil 3 event upcoming terbaru
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const upcoming = data
        .filter((e) => new Date(e.event_date) >= today)
        .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
        .slice(0, 3);

      // Jika upcoming kurang dari 3, tambal dengan event terbaru (past)
      if (upcoming.length < 3) {
        const past = data
          .filter((e) => new Date(e.event_date) < today)
          .sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime())
          .slice(0, 3 - upcoming.length);
        setFeaturedEvents([...upcoming, ...past]);
      } else {
        setFeaturedEvents(upcoming);
      }
    } catch (error) {
      console.error("Gagal mengambil data events:", error);
      setFeaturedEvents([]);
    } finally {
      setEventsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-jakarta overflow-x-hidden text-sag-blue">

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────────── */}
      <section className="min-h-screen bg-sag-blue flex items-center px-10 md:px-24 pt-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-white/5 skew-x-12 translate-x-32 hidden lg:block" />
        <div className="container mx-auto z-10 text-left">
          <div className="max-w-4xl relative z-20">
            <h1 data-aos="fade-up" data-aos-delay="100" className="text-white text-6xl md:text-8xl font-black tracking-tighter leading-none mb-10 uppercase text-balance">
              SAG <span className="text-blue-400">LABORATORY</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="300" className="text-blue-100 text-xl md:text-2xl max-w-3xl leading-relaxed font-medium opacity-95 mb-16">
              Empowering students to plan, design, and align information systems that drive real business impact.
              <span className="text-white block mt-5 font-semibold italic">"Bridging ideas and implementation with strategic system thinking."</span>
            </p>
            <div data-aos="fade-up" data-aos-delay="500" className="flex flex-col sm:flex-row gap-6 font-bold relative z-30">
              <Link href="/research" className="group/btn relative px-12 py-5 bg-white text-sag-blue rounded-2xl overflow-hidden hover:bg-blue-50 transition-all duration-500 shadow-xl hover:-translate-y-2 active:scale-95 flex items-center justify-center gap-3 text-lg uppercase tracking-wider cursor-pointer">
                Explore Research
                <ArrowIcon className="transition-transform duration-500 group-hover/btn:translate-x-2" />
              </Link>
              <Link href="/about" className="px-12 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl hover:bg-white/20 transition-all duration-500 shadow-lg hover:-translate-y-2 active:scale-95 text-lg uppercase tracking-wider cursor-pointer flex items-center justify-center">
                About Our Lab
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────────────── */}
      <div className="relative bg-sag-blue overflow-hidden py-10 z-20 border-y border-white/10">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-2xl" />
        <div className="relative z-10 flex animate-marquee whitespace-nowrap items-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              {MARQUEE_ITEMS.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-white text-xl md:text-2xl font-black uppercase tracking-tighter px-12 opacity-90">{item}</span>
                  <div className="flex items-center justify-center"><div className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-[0_0_20px_rgba(74,222,128,1)]" /></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: SAG STUDY GROUP ──────────────────────────────────────── */}
      <section className="py-40 px-10 md:px-24 bg-gradient-to-b from-white via-blue-50/50 to-blue-100/30 relative overflow-hidden text-left">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-200/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mb-24">
            <h2 data-aos="fade-up" className="text-sag-blue text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none uppercase">SAG <span className="text-blue-600">Study Group</span></h2>
            <div className="flex items-center gap-3 mb-10"><div className="w-24 h-2.5 bg-blue-600 rounded-full shadow-lg shadow-blue-200" /><div className="w-8 h-2.5 bg-blue-400 rounded-full opacity-50" /></div>
            <p data-aos="fade-up" data-aos-delay="200" className="text-gray-600 text-xl md:text-2xl leading-relaxed max-w-3xl font-medium mb-12">The SAG Study Group 2025 is focused on three key areas: <span className="text-sag-blue font-extrabold italic underline decoration-blue-200 decoration-4 underline-offset-4"> Enterprise Architecture, Business Process, and IT Governance.</span></p>
            <button data-aos="fade-up" data-aos-delay="300" onClick={() => (window.location.href = "/study-group")} className="group/join relative px-10 py-4 bg-sag-blue text-white rounded-2xl overflow-hidden hover:bg-blue-800 transition-all duration-700 shadow-xl hover:-translate-y-2 active:scale-95 flex items-center justify-center gap-3 text-lg font-bold uppercase tracking-wider cursor-pointer">Join Study Group <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="transition-transform duration-500 group-hover/join:translate-x-2"><path d="M5 12h14M12 5l7 7-7 7" /></svg></button>
          </div>
          <div className="grid md:grid-cols-3 gap-10">{STUDY_GROUP_TOPICS.map((topic, i) => (<StudyGroupCard key={i} index={i} {...topic} />))}</div>
        </div>
      </section>

      {/* ── SECTION 3: RESEARCH ─────────────────────────────────────────────── */}
      <section className="py-40 px-10 md:px-24 bg-gradient-to-b from-white via-blue-50 to-blue-100/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#2563eb 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-200/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8 text-left">
            <div className="max-w-2xl"><h2 data-aos="fade-right" className="text-sag-blue text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-none uppercase">Latest <span className="text-blue-600">Research</span></h2><p data-aos="fade-right" data-aos-delay="200" className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-xl">Exploring information systems strategy through our latest publications on Medium.</p></div>
            <button onClick={() => window.open("https://medium.com/@SAGLaboratory", "_blank")} data-aos="fade-left" className="group flex items-center gap-3 bg-white hover:bg-blue-50 text-sag-blue font-bold px-8 py-4 rounded-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 uppercase text-xs tracking-widest cursor-pointer shadow-sm hover:shadow-md">Visit Our Medium <ArrowIcon className="transition-transform group-hover:translate-x-1" /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-10">{RESEARCH_ARTICLES.map((article, i) => (<ResearchCard key={i} {...article} />))}</div>
        </div>
      </section>

      {/* ── SECTION 4: FEATURED EVENTS (DATA REAL DARI API) ─────────────────── */}
      <section className="py-40 px-10 md:px-24 bg-sag-blue relative overflow-hidden text-left">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-100/10 to-transparent" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-3xl">
              <h2 data-aos="fade-right" className="text-white text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase leading-none">
                Featured <span className="text-blue-400">Events</span>
              </h2>
              <p data-aos="fade-right" data-aos-delay="200" className="text-blue-100/70 text-lg md:text-xl font-medium max-w-xl">
                Connecting expertise and ambition through our flagship programs.
              </p>
            </div>
            <Link
              href="/events"
              data-aos="fade-left"
              className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-500 border border-white/20 hover:border-white/40 uppercase text-xs tracking-widest cursor-pointer shadow-sm hover:shadow-md backdrop-blur-md whitespace-nowrap"
            >
              View All Events <ArrowIcon className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Loading skeleton */}
          {eventsLoading ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-[480px] bg-white/5 animate-pulse rounded-[3rem]" />
              ))}
            </div>
          ) : featuredEvents.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {featuredEvents.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-white/10 rounded-[3rem]">
              <p className="text-blue-100/50 font-black uppercase tracking-widest text-sm">No events available</p>
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 5: OFFICIAL PARTNERS ────────────────────────────────────── */}
      <section className="py-32 px-10 md:px-24 bg-white relative overflow-hidden">
        <div className="container mx-auto relative z-10 text-center">
          <div data-aos="fade-up" className="mb-16">
            <h2 className="text-sag-blue text-3xl md:text-4xl font-black tracking-tighter uppercase mb-4">Official <span className="text-blue-600">Partners</span></h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full shadow-lg shadow-blue-200" />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70 hover:opacity-100 transition-opacity duration-700">
            <div data-aos="zoom-in" data-aos-delay="100" className="group relative w-150 h-50 transition-all duration-600 grayscale hover:grayscale-0 hover:scale-110">
              <Image src="/Isg-Binus.png" alt="ISG Binus" fill className="object-contain" />
            </div>
          </div>
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
              <div className="flex items-center gap-4">
                {[
                  { label: "Instagram", url: "https://instagram.com/saglaboratory", viewBox: "0 0 24 24", svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /> },
                  { label: "LinkedIn", url: "https://www.linkedin.com/company/sag-laboratory/", viewBox: "0 0 512 512", svg: <path d="M150.65,100.68c0,27.99-22.69,50.68-50.68,50.68s-50.68-22.69-50.68-50.68C49.29,72.69,71.98,50,99.97,50s50.68,22.69,50.68,50.68z M150.65,191.63H49.29V462h101.36V191.63z M351.51,191.63c-22.69,0-43.03,8.08-58.82,22.13v-22.13H191.33V462h101.36V297.43c0-21.6,1.44-42.94,22.13-42.94c20.01,0,22.13,18.53,22.13,42.94V462H462V288.79C462,207.71,432.22,191.63,351.51,191.63z" /> },
                  { label: "Email", url: "mailto:sag@telkomuniversity.ac.id", viewBox: "0 0 24 24", svg: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /> }
                ].map((social, i) => (
                  <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-blue-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-black-600 p-2.5 bg-white shadow-sm">
                    <svg width="100%" height="100%" viewBox={social.viewBox} fill="currentColor">{social.svg}</svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start">
              <h4 className="text-sag-blue text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-40 text-left">Navigation</h4>
              <nav className="flex flex-col gap-5 text-sm font-bold tracking-widest text-left capitalize">
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
                <Link href="/study-group" className="text-gray-600 hover:text-blue-600 transition-colors">Study group</Link>
                <Link href="/research" className="text-gray-600 hover:text-blue-600 transition-colors">Research</Link>
                <Link href="/events" className="text-gray-600 hover:text-blue-600 transition-colors">Events</Link>
              </nav>
            </div>

            <div className="flex flex-col items-start text-left">
              <h4 className="text-sag-blue text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-40">Contact</h4>
              <div className="mb-8 text-left">
                <p className="text-sag-blue font-black text-sm uppercase mb-3 text-left">SAG Laboratory</p>
                <p className="text-gray-500 text-sm font-medium leading-loose max-w-[300px] text-left">
                  Jl. Telekomunikasi No.1, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40267
                </p>
              </div>
              <a href="mailto:sag@telkomuniversity.ac.id" className="text-black-600 font-bold text-sm border-b border-blue-600/20 hover:border-blue-600 pb-1 transition-all">
                sag@telkomuniversity.ac.id
              </a>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-blue-100 flex justify-center text-gray-400 text-[10px] font-black uppercase tracking-widest text-center">
            © 2026 SAG Laboratory Telkom University. All rights reserved.
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>
    </div>
  );
}