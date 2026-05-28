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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    )
  },
  {
    title: "Mental Health Balance",
    desc: "Menjaga keseimbangan kinerja dan kesehatan mental melalui sistem kerja yang melindungi waktu istirahat.",
    iconColor: "bg-green-50 text-green-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
    )
  },
  {
    title: "Budaya Saling Percaya",
    desc: "Mendorong kolaborasi lintas divisi sehingga staf merasa menjadi bagian utuh dari Laboratorium SAG.",
    iconColor: "bg-purple-50 text-purple-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" /></svg>
    )
  },
  {
    title: "Ruang Belajar Aktif",
    desc: "Menjadikan anggota aktif merancang, menjalankan, dan merefleksikan program kerja untuk tumbuh bersama.",
    iconColor: "bg-amber-50 text-amber-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
    )
  },
  {
    title: "Pencapaian Holistik",
    desc: "Keseimbangan antara pengembangan pribadi, akademik, dan sertifikasi profesional secara internal & eksternal.",
    iconColor: "bg-cyan-50 text-cyan-600",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
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

// ─── Tipe Data untuk TypeScript (Fix Build Error) ──────────────────────────

interface TeamCardProps {
  role: string;
  name: string;
  image: string;
  isMain?: boolean;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TeamCard({ role, name, image, isMain = false }: TeamCardProps) {
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

      {/* ── SECTION 1: HERO ── */}
      <section className="py-24 md:py-44 px-6 md:px-24 bg-sag-blue text-white relative flex items-center justify-center text-center">
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

      {/* ── SECTION 2: VISI MISI ── */}
      <section className="py-24 md:py-32 px-6 md:px-24 container mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          <div data-aos="fade-right" className="bg-blue-50/50 rounded-[3rem] p-10 md:p-16 relative overflow-hidden flex flex-col justify-center border border-blue-100">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 relative z-10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="3"><path d="M12 2v8m0 0l-3-3m3 3l3-3m-9 13a9 9 0 1118 0H3z" /></svg>
            </div>
            <h2 className="text-gray-900 text-4xl font-black mb-8 relative z-10 tracking-tight">Our Vision</h2>
            <p className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed relative z-10">
              Menjadikan Laboratorium SAG sebagai laboratorium unggulan yang berprestasi secara akademik dan profesional, sekaligus menjadi ruang pengembangan diri yang sehat, aman, dan kolaboratif, di mana setiap anggota tumbuh bersama dengan rasa percaya diri dan inisiatif pada setiap anggota.
            </p>
          </div>

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-12">
            {CORE_TEAM.map((member, i) => (
              <div key={i} data-aos="fade-up" data-aos-delay={member.delay}>
                <TeamCard {...member} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto items-center">
            <div data-aos="fade-right"><TeamCard {...HEADS_TEAM[0]} /></div>
            <div data-aos="zoom-in" className="flex justify-center flex-shrink-0 px-10">
              <div className="relative w-full aspect-square opacity-70 group hover:opacity-100 transition-opacity">
                <Image src="/logo-sag.png" alt="SAG Logo Organization" fill className="object-contain" />
              </div>
            </div>
            <div data-aos="fade-left"><TeamCard {...HEADS_TEAM[1]} /></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mt-6">
            <div data-aos="fade-up" data-aos-delay="100"><TeamCard {...HEADS_TEAM[2]} /></div>
            <div data-aos="fade-up" data-aos-delay="200"><TeamCard {...HEADS_TEAM[3]} /></div>
            <div data-aos="fade-up" data-aos-delay="300"><TeamCard {...HEADS_TEAM[4]} /></div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="bg-gradient-to-b from-white via-blue-50/50 to-blue-100/40 py-16 md:py-24 px-6 md:px-32 relative overflow-hidden border-t border-blue-100">
        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
            <div className="flex flex-col items-start text-left">
              <div className="relative w-44 h-12 md:h-16 mb-6">
                <Image src="/logo-sag.png" alt="SAG Lab Logo" fill className="object-contain object-left" />
              </div>
              <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[320px] mb-10">
                Bridging systems engineering with strategic IT governance to drive digital transformation and organizational excellence.
              </p>
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