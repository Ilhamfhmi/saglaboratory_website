"use client";
import { useEffect, useState } from "react";
import Link from "next/link"; // Gunakan nama Link agar sesuai dengan Footer
import Image from "next/image"; 
import AOS from "aos";
import "aos/dist/aos.css";

// ─── Interface untuk Tipe Data ──────────────────────────────────────────────

interface ResearchItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  link_medium: string;
}

export default function ResearchPage() {
  const [articles, setArticles] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Inisialisasi AOS dengan offset 0 agar langsung muncul
    AOS.init({ 
      duration: 800, 
      once: true,
      offset: 0 
    });
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/research?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Accept": "application/json" }
      });
      
      const data = await response.json();
      setArticles(data);

      // Refresh AOS segera setelah data masuk
      setTimeout(() => {
        AOS.refresh();
      }, 100);

    } catch (error) {
      console.error("Gagal mengambil data research:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mencegah delay tampilan putih saat proses hydration
  if (!isMounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="min-h-screen bg-white font-jakarta pt-20 overflow-x-hidden text-sag-blue text-left">
      
      {/* ── SECTION 1: HERO ── */}
      <section className="py-24 md:py-48 px-6 md:px-24 bg-sag-blue text-white relative flex items-center justify-center text-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-blue-400/20 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto relative z-10 max-w-5xl">
          <h1 data-aos="zoom-in" className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-10">
            Research <span className="bg-gradient-to-br from-[#22D3EE] via-white to-[#22D3EE] bg-clip-text text-transparent">Insights</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="100" className="text-blue-100/70 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed text-center">
            Menyajikan analisis mendalam mengenai tata kelola TI, arsitektur enterprise, 
            dan optimasi proses bisnis langsung dari basis data SAG Laboratory.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: ARTICLES GRID ── */}
      <section className="py-24 px-6 md:px-24 bg-gray-50/30 min-h-[400px]">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6" data-aos="fade-up">
            <div className="text-left">
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                {loading ? "Syncing..." : "Latest Publications"}
              </span>
              <h2 className="text-sag-blue text-4xl md:text-5xl font-black uppercase tracking-tighter mt-6">Knowledge Base</h2>
            </div>
            <a 
              href="https://medium.com/@SAGLaboratory" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-sag-blue font-black text-xs uppercase tracking-widest border-b-2 border-blue-600 pb-2 transition-all hover:text-blue-600"
            >
              Follow our Medium
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>

          <div key={articles.length} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              [1, 2, 3].map((n) => (
                <div key={n} className="h-[450px] bg-gray-100 animate-pulse rounded-[2.5rem]"></div>
              ))
            ) : articles.length === 0 ? (
              <div className="col-span-full py-20 text-center text-gray-400 font-bold italic">
                Belum ada data penelitian yang ditemukan di database.
              </div>
            ) : (
              articles.map((article, i) => (
                <div 
                  key={article.id} 
                  data-aos="fade-up" 
                  data-aos-delay={i * 50}
                  className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:border-blue-400 transition-all duration-500 hover:shadow-2xl flex flex-col h-full !opacity-100"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <img 
                      src={article.image_url || "/placeholder.jpg"} 
                      alt={article.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      onError={(e) => { (e.currentTarget.src = "/logo-sag.png"); }}
                    />
                    <div className="absolute top-6 left-6 z-20">
                      <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-sag-blue text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-10 flex flex-col flex-grow text-left">
                    <h3 className="text-sag-blue text-2xl font-black uppercase tracking-tight mb-4 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium mb-8 opacity-80 line-clamp-3">
                      {article.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-gray-50 text-left">
                      <a 
                        href={article.link_medium}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-sag-blue font-black uppercase tracking-widest text-[11px] group/link"
                      >
                        Read Full Article
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover/link:bg-sag-blue group-hover/link:text-white transition-all duration-300">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: MOTTO ── */}
      <section className="py-24 px-6 md:px-24 bg-sag-blue text-white relative overflow-hidden text-center border-t border-white/10">
          <div className="container mx-auto max-w-4xl relative z-10">
            <h2 data-aos="fade-up" className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight">
              Empowering industry with <br/> <span className="text-blue-400">Data-Driven Governance</span>
            </h2>
            <p className="text-blue-100/60 font-medium text-lg">
              Kami percaya bahwa arsitektur teknologi yang baik adalah fondasi dari setiap kesuksesan organisasi di era digital.
            </p>
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
                  { label: "LinkedIn", url: "https://www.linkedin.com/company/sag-laboratory/", viewBox: "0 0 512 512", svg: <path d="M150.65,100.68c0,27.99-22.69,50.68-50.68,50.68s-50.68-22.69-50.68-50.68C49.29,72.69,71.98,50,99.97,50s50.68,22.69,50.68,50.68z M150.65,191.63H49.29V462h101.36V191.63z M351.51,191.63c-22.69,0-43.03,8.08-58.82,22.13v-22.13H191.33V462h101.36V297.43c0-21.6,1.44-42.94,22.13-42.94c20.01,0,22.13,18.53,22.13,42.94V462H462V288.79C462,207.71,432.22,191.63,351.51,191.63z"/> },
                  { label: "Email", url: "mailto:sag@telkomuniversity.ac.id", viewBox: "0 0 24 24", svg: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /> }
                ].map((social, i) => (
                  <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-blue-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-black-600 p-2.5 bg-white shadow-sm">
                    <svg width="100%" height="100%" viewBox={social.viewBox} fill="currentColor">
                      {social.svg}
                    </svg>
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

          <div className="mt-20 pt-10 border-t border-blue-100 flex justify-center items-center">
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest text-center">
              © 2026 SAG Laboratory Telkom University. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}