'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AOS from "aos";
import "aos/dist/aos.css";

// ─── Constants ───────────────────────────────────────────────────────────────

const STUDY_ROLES = [
  {
    title: "Enterprise Architecture",
    desc: "Mempelajari perancangan struktur organisasi yang menyelaraskan strategi bisnis dengan infrastruktur IT.",
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Business Process",
    desc: "Fokus pada pemetaan, analisis, dan optimasi alur kerja organisasi untuk mencapai efisiensi maksimal.",
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50"
  },
  {
    title: "IT Governance",
    desc: "Mendalami tata kelola IT untuk memastikan investasi teknologi memberikan nilai bisnis.",
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-4 9-8 10-4-1-8-5-8-10V6l8-4z"/></svg>,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

export default function StudyGroup() {
  const [nim, setNim] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setResult(null);

    // Simulasi delay pengecekan database
    setTimeout(() => {
      setLoading(false);
      if (nim === '1202220001') {
        setResult({ name: 'ILHAM FAHMI', role: 'ENTERPRISE ARCHITECTURE' });
      } else {
        setError(true);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white font-jakarta pt-20 overflow-x-hidden text-sag-blue">
      
      {/* ── SECTION 1: HERO ── */}
      <section className="py-24 md:py-48 px-6 md:px-24 bg-sag-blue text-white relative flex items-center justify-center text-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-blue-400/20 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto relative z-10 max-w-5xl">
          <h1 data-aos="zoom-in" className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-10">
            SAG <span className="bg-gradient-to-br from-[#22D3EE] via-white to-[#22D3EE] bg-clip-text text-transparent">Study Group</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="300" className="text-blue-100/70 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Program inkubasi intensif yang dirancang untuk membekali mahasiswa dengan keahlian strategis di bidang Sistem Informasi sebelum terjun ke dunia industri profesional.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: FOCUS AREAS ── */}
      <section className="py-24 px-6 md:px-24 container mx-auto">
        <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-sag-blue text-xs font-black uppercase tracking-[0.4em] mb-4 opacity-40 text-center">Focus Areas</h2>
            <p className="text-sag-blue text-4xl font-black tracking-tight text-center">Core Competencies</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {STUDY_ROLES.map((role, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 100} className="p-10 rounded-[3rem] bg-gray-50 border border-gray-100 hover:border-blue-200 transition-all duration-500 group text-left">
              <div className={`w-16 h-16 ${role.bgColor} ${role.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                {role.icon}
              </div>
              <h3 className="text-sag-blue text-2xl font-black uppercase mb-4 tracking-tight leading-tight">{role.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-medium opacity-80">{role.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: CEK KELULUSAN (Standar & Memanjang) ── */}
      <section className="py-24 px-6 md:px-24 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-xl mx-auto">
          {/* Judul */}
          <div className="text-center mb-10" data-aos="fade-up">
            <h2 className="text-sag-blue text-3xl font-black uppercase tracking-tight">Cek Kelulusan</h2>
            <p className="text-gray-400 text-sm mt-2 font-medium">Study Group Admission 2026</p>
          </div>

          {/* Form Standar */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-200" data-aos="fade-up" data-aos-delay="200">
            <form onSubmit={handleCheck} className="space-y-6">
              <div className="text-left">
                <label className="block text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 ml-1">Nomor Induk Mahasiswa (NIM)</label>
                <input 
                  type="text" 
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  placeholder="Contoh: 120222XXXX"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:border-sag-blue outline-none transition-all font-bold text-lg text-sag-blue placeholder:text-gray-300"
                  required
                />
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-sag-blue text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-800 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-blue-100"
              >
                {loading ? 'Mengecek...' : 'Lihat Hasil Seleksi'}
              </button>
            </form>

            {/* Area Hasil */}
            {(result || error || loading) && (
              <div className="mt-10 pt-10 border-t border-gray-100">
                
                {loading && (
                  <div className="flex flex-col items-center py-4">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Memproses Permintaan...</p>
                  </div>
                )}

                {result && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-green-50 border border-green-100 p-8 rounded-[2rem] text-left">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-green-600">Pengumuman Kelulusan</span>
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 leading-none mb-2">{result.name}</h3>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-tighter mb-6">NIM: {nim}</p>
                      
                      <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          Selamat! Anda lulus sebagai anggota Study Group pada role <span className="font-black text-sag-blue">{result.role}</span>. Harap tunggu informasi instruksi selanjutnya.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-red-50 border border-red-100 p-8 rounded-[2rem] text-center">
                      <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </div>
                      <h3 className="text-red-900 font-black uppercase tracking-tight text-lg mb-1">NIM Tidak Terdaftar</h3>
                      <p className="text-red-600/70 text-sm font-medium">Mohon maaf, data Anda tidak ditemukan dalam database periode ini.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
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