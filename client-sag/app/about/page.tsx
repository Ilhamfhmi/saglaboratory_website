"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

// ─── Constants ───────────────────────────────────────────────────────────────

const MISI_DATA = [
  {
    title: "Kebersamaan & Profesional",
    desc: "Membangun kembali rasa kekeluargaan staf dengan tetap menjaga standar profesionalisme tinggi.",
    iconColor: "bg-blue-50 text-blue-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    )
  },
  {
    title: "Mental Health Balance",
    desc: "Menjaga keseimbangan kinerja dan kesehatan mental melalui sistem kerja yang melindungi waktu istirahat.",
    iconColor: "bg-green-50 text-green-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    )
  },
  {
    title: "Budaya Saling Percaya",
    desc: "Mendorong kolaborasi lintas divisi sehingga staf merasa menjadi bagian utuh dari Laboratorium SAG.",
    iconColor: "bg-purple-50 text-purple-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
    )
  },
  {
    title: "Ruang Belajar Aktif",
    desc: "Menjadikan anggota aktif merancang, menjalankan, dan merefleksikan program kerja untuk tumbuh bersama.",
    iconColor: "bg-amber-50 text-amber-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
    )
  },
  {
    title: "Pencapaian Holistik",
    desc: "Keseimbangan antara pengembangan pribadi, akademik, dan sertifikasi profesional secara internal & eksternal.",
    iconColor: "bg-cyan-50 text-cyan-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    )
  }
];

const CORE_TEAM = [
  { role: "Vice Coordinator", name: "Adhira Zhafif", image: "/vice.png", delay: 100 },
  { role: "Coordinator", name: "Dzaki Hilmi", image: "/coordinator.png", delay: 200, isMain: true },
  { role: "Secretary", name: "Naurah Bauw", image: "/secretary.png", delay: 300 },
];

const HEADS_TEAM = [
  { role: "Head of Digital Content", name: "Ilham Fahmi", image: "/Ditent.png" },
  { role: "Head of HCM", name: "Brigita Selva", image: "/Hcm.png" },
  { role: "Head of Research", name: "Alya Davina", image: "/Research.png" },
  { role: "Head of Event & Competition", name: "Irfan Ubaidillah", image: "/Eventt.png" },
  { role: "Head of Study Group", name: "Fajriani Rahmanisa", image: "/Study group.png" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function TeamCard({ role, name, image, isMain = false }) {
  return (
    <div className={`group bg-white rounded-[2rem] p-5 border border-gray-100 hover:border-blue-400 transition-all duration-500 hover:shadow-xl ${isMain ? 'ring-2 ring-blue-500/10' : ''}`}>
      <div className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-4 bg-gray-50">
        <Image src={image} alt={name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="text-center">
        <h3 className="text-sag-blue text-[11px] font-black uppercase tracking-widest mb-1 leading-tight">{role}</h3>
        <p className="text-gray-400 text-[13px] font-bold uppercase tracking-tighter">{name}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-white font-jakarta pt-20 overflow-x-hidden">
      
      {/* ── SECTION 1: HERO (Centered with Large Text) ── */}
      <section className="py-24 md:py-44 px-6 md:px-24 bg-sag-blue text-white relative flex items-center justify-center text-center">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-blue-400/20 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto relative z-10 max-w-5xl">
          <h1 data-aos="zoom-in" className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-10">
            Innovating System <br /> 
            <span className="bg-gradient-to-r from-blue-300 via-white to-blue-200 bg-clip-text text-transparent">
                Empowering Tomorrow
            </span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="300" className="text-blue-100/70 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Center for information systems excellence and digital governance literacy, 
            bridging academic frameworks with real-world enterprise architecture and 
            IT strategic practices in the global industry.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: VISI MISI (Bento Layout) ── */}
      <section className="py-24 md:py-32 px-6 md:px-24 container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Visi (Kiri) - Nuansa Biru */}
          <div data-aos="fade-right" className="bg-blue-50/50 rounded-[3rem] p-10 md:p-16 relative overflow-hidden flex flex-col justify-center border border-blue-100">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 relative z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3"><path d="M12 2v8m0 0l-3-3m3 3l3-3m-9 13a9 9 0 1118 0H3z"/></svg>
             </div>
             <h2 className="text-gray-900 text-4xl font-black mb-8 relative z-10 tracking-tight">Our Vision</h2>
             <p className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed relative z-10">
               Menjadikan Laboratorium SAG sebagai laboratorium unggulan yang berprestasi secara akademik dan profesional, sekaligus menjadi ruang pengembangan diri yang sehat, aman, dan kolaboratif, di mana setiap anggota tumbuh bersama dengan rasa percaya diri dan inisiatif pada setiap anggota.
             </p>
          </div>

          {/* Misi (Kanan) */}
          <div className="flex flex-col gap-5">
            {MISI_DATA.map((misi, i) => (
              <div key={i} data-aos="fade-left" data-aos-delay={i * 100} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-start gap-5 group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${misi.iconColor}`}>
                  {misi.icon}
                </div>
                <div>
                  <h3 className="text-gray-900 text-[17px] font-black mb-1 leading-tight tracking-tight">{misi.title}</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">{misi.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: OUR TEAM STRUCTURE ── */}
      <section className="py-24 md:py-32 px-6 md:px-24 bg-gray-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-16 md:mb-24" data-aos="fade-up">
            <h2 className="text-sag-blue text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-tight">Laboratory Structure</h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          {/* Baris 1: Vice - Coordinator - Secretary (Sejajar) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-12">
            {CORE_TEAM.map((member, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={member.delay}>
                <TeamCard {...member} />
              </div>
            ))}
          </div>

          {/* Baris 2: Kadiv (Kanan Kiri, Tengah Logo SAG sebagai penyeimbang) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto items-center">
            <div data-aos="fade-right"><TeamCard {...HEADS_TEAM[0]} /></div> {/* Digital Content */}
            
            <div data-aos="zoom-in" className="flex justify-center flex-shrink-0 px-10">
                <div className="relative w-full aspect-square opacity-70 group hover:opacity-100 transition-opacity">
                    <Image src="/logo-sag.png" alt="SAG Logo Organization" fill className="object-contain" />
                </div>
            </div>

            <div data-aos="fade-left"><TeamCard {...HEADS_TEAM[1]} /></div> {/* Study Group */}
          </div>

          {/* Baris 3: Sisa Kadiv */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mt-6">
            <div data-aos="fade-up" data-aos-delay="100"><TeamCard {...HEADS_TEAM[2]} /></div>
            <div data-aos="fade-up" data-aos-delay="200"><TeamCard {...HEADS_TEAM[3]} /></div>
            <div data-aos="fade-up" data-aos-delay="300"><TeamCard {...HEADS_TEAM[4]} /></div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      {/* Warna disamakan dengan Section 2: Biru Muda yang sangat soft */}
      <footer className="bg-gradient-to-b from-white via-blue-50/50 to-blue-100/40 py-16 md:py-24 px-6 md:px-32 relative overflow-hidden border-t border-blue-100">
        
        {/* Background Decorative - Tetap ada grid tipis seperti Section 2 agar konsisten */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb\ 1px, transparent 1px)`, 
            backgroundSize: "40px 40px" 
          }} 
        />

        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
            
            {/* Branding - Logo SAG berwarna asli (bukan putih) karena background terang */}
            <div className="flex flex-col items-start text-left">
              <div className="relative w-44 h-12 md:h-16 mb-6">
                <Image src="/logo-sag.png" alt="SAG Lab Logo" fill className="object-contain object-left" />
              </div>
              <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[320px] mb-10">
                Bridging systems engineering with strategic IT governance to drive digital transformation and organizational excellence.
              </p>
              
              <div className="flex items-center gap-4">
                {[
                  { 
                    label: "Instagram", url: "https://instagram.com/saglaboratory", 
                    viewBox: "0 0 24 24",
                    svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /> 
                  },
                  { 
                    label: "LinkedIn", url: "https://www.linkedin.com/company/sag-laboratory/", 
                    viewBox: "0 0 512 512",
                    svg: <path d="M150.65,100.68c0,27.99-22.69,50.68-50.68,50.68s-50.68-22.69-50.68-50.68C49.29,72.69,71.98,50,99.97,50s50.68,22.69,50.68,50.68z M150.65,191.63H49.29V462h101.36V191.63z M351.51,191.63c-22.69,0-43.03,8.08-58.82,22.13v-22.13H191.33V462h101.36V297.43c0-21.6,1.44-42.94,22.13-42.94c20.01,0,22.13,18.53,22.13,42.94V462H462V288.79C462,207.71,432.22,191.63,351.51,191.63z"/> 
                  },
                  { 
                    label: "Email", url: "mailto:sag@telkomuniversity.ac.id", 
                    viewBox: "0 0 24 24",
                    svg: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /> 
                  }
                ].map((social, i) => (
                  <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-blue-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-black-600 p-2.5 bg-white shadow-sm">
                    <svg width="100%" height="100%" viewBox={social.viewBox} fill="currentColor">
                      {social.svg}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col items-start">
              <h4 className="text-sag-blue text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-40 text-left">
                Navigation
              </h4>
              <nav className="flex flex-col gap-5 text-sm font-bold tracking-widest text-left capitalize">
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Home
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  About
                </Link>
                <Link href="/study-group" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Study group
                </Link>
                <Link href="/research" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Research
                </Link>
                <Link href="/events" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Events
                </Link>
              </nav>
            </div>

            {/* Contact */}
            <div className="flex flex-col items-start text-left">
              <h4 className="text-sag-blue text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-40">Contact</h4>
              <div className="mb-8">
                <p className="text-sag-blue font-black text-sm uppercase mb-3">SAG Laboratory</p>
                <p className="text-gray-500 text-sm font-medium leading-loose max-w-[300px]">
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