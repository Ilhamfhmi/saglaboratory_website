'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AOS from "aos";
import "aos/dist/aos.css";

// ─── Constants: Pillar SAG ──────────────────────────────────────────────────
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
    desc: "Mendalami tata kelola IT untuk memastikan investasi teknologi memberikan nilai bisnis bagi organisasi.",
    icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l8 4v6c0 5-4 9-8 10-4-1-8-5-8-10V6l8-4z"/></svg>,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

export default function StudyGroup() {
  const [nim, setNim] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupsLoading, setGroupsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchActiveGroups();
  }, []);

  const fetchActiveGroups = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/study-groups');
      const data = await response.json();
      const activeData = Array.isArray(data) ? data.filter((g: any) => g.status === 'Active') : [];
      setGroups(activeData as any);
    } catch (err) {
      console.error("Gagal mengambil data grup:", err);
    } finally {
      setGroupsLoading(false);
    }
  };

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckLoading(true);
    setError(false);
    setResult(null);

    try {
      const response = await fetch(`http://localhost:8000/api/check-admission/${nim}`);
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setCheckLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-jakarta pt-20 overflow-x-hidden text-sag-blue text-left">
      
      {/* ── SECTION 1: HERO ── */}
      <section className="py-24 md:py-44 px-6 md:px-24 bg-sag-blue text-white relative overflow-hidden flex items-center justify-center text-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }}></div>
        </div>
        <div className="container mx-auto relative z-10 max-w-5xl text-center">
          <h1 data-aos="zoom-in" className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-10 text-center">
            SAG <span className="bg-gradient-to-br from-blue-300 via-white to-blue-300 bg-clip-text text-transparent">Study Group</span>
          </h1>
          <p data-aos="fade-up" data-aos-delay="300" className="text-blue-100/80 text-lg md:text-xl max-w-3xl mx-auto font-bold leading-relaxed text-center">
            Program inkubasi riset strategis bagi mahasiswa untuk mendalami Enterprise Architecture, Business Process, dan IT Governance.
          </p>
        </div>
      </section>

      {/* ── SECTION 2: PILLARS ── */}
      <section className="py-32 px-6 md:px-24 container mx-auto text-left">
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-blue-600 text-[10px] font-black uppercase tracking-[0.5em] mb-4 text-center">The Pillars</h2>
          <p className="text-4xl md:text-5xl font-black tracking-tighter text-sag-blue uppercase text-center">Core Competencies</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STUDY_ROLES.map((role, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={i * 100} className="p-12 rounded-[3.5rem] bg-gray-50 border border-gray-100 transition-all hover:border-blue-200 duration-500 group text-left">
              <div className={`w-16 h-16 ${role.bgColor} ${role.color} rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-sm`}>
                {role.icon}
              </div>
              <h3 className="text-2xl font-black uppercase mb-5 tracking-tight text-sag-blue leading-tight text-left">{role.title}</h3>
              <p className="text-gray-500 text-sm font-bold leading-relaxed opacity-70 text-left">{role.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 3: ACTIVE GROUPS ── */}
      <section className="py-32 px-6 md:px-24 bg-[#F8FAFC] border-y border-gray-100 text-left">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8" data-aos="fade-up">
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3">
                <span className="w-12 h-[2px] bg-blue-600"></span>
                <h2 className="text-blue-600 text-[10px] font-black uppercase tracking-[0.5em]">Current Projects</h2>
              </div>
              <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-sag-blue uppercase leading-none text-left">
                Active <span className="text-blue-600">Study Groups</span>
              </h3>
            </div>
            <div className="max-w-sm">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-relaxed border-l-2 border-blue-100 pl-6 text-left">
                Inkubasi riset mendalam yang berfokus pada transformasi digital dan optimasi sistem organisasi.
              </p>
            </div>
          </div>

          {groupsLoading ? (
            <div className="py-32 text-center">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="font-black text-gray-300 uppercase tracking-[0.3em] text-[10px]">Synchronizing Teams...</p>
            </div>
          ) : groups.length === 0 ? (
            <div className="py-32 bg-white rounded-[3rem] border border-dashed border-gray-200 text-center">
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No active research groups found in this period.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
              {groups.map((group: any, i) => (
                <Link 
                  href={`/study-group/${group.id}`} 
                  key={i} 
                  data-aos="fade-up" 
                  data-aos-delay={i * 100} 
                  className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:border-blue-500/30 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(37,99,235,0.1)] flex flex-col h-full text-left"
                >
                  <div className="relative h-72 w-full overflow-hidden bg-gray-100">
                    <img src={group.image_url} alt={group.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute top-8 left-8">
                      <div className="backdrop-blur-md bg-white/90 px-5 py-2 rounded-full shadow-sm border border-white/20">
                        <span className="text-blue-600 text-[9px] font-black uppercase tracking-widest">{group.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-10 space-y-6 flex flex-col flex-grow text-left">
                    <div className="space-y-3 text-left">
                      <h4 className="text-2xl font-black text-sag-blue uppercase tracking-tighter leading-tight group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 text-left">{group.title}</h4>
                      
                      {/* FIX: GANTI HURUF DENGAN IKON ORANG */}
                      <div className="flex items-center gap-3 text-left">
                         <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm border border-blue-50">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                         </div>
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Lead by {group.leader}</span>
                      </div>

                    </div>
                    <p className="text-gray-500 text-xs font-bold leading-relaxed opacity-70 line-clamp-3 text-left">{group.description}</p>
                    <div className="pt-6 mt-auto border-t border-gray-50 flex justify-between items-center text-left">
                      <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em]">In Progress</span>
                      <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 4: ADMISSION CHECK ── */}
      <section className="py-40 px-6 md:px-24 bg-white relative text-left">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-14" data-aos="fade-up">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-sag-blue text-center">Cek Kelulusan</h2>
            <p className="text-gray-400 text-[10px] mt-4 font-black uppercase tracking-[0.4em] text-center">Admission Status 2026</p>
          </div>
          <div className="bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl shadow-blue-900/10 border border-gray-100" data-aos="fade-up">
            <form onSubmit={handleCheck} className="space-y-8">
              <div className="space-y-4 text-left">
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 ml-1 text-left">Nomor Induk Mahasiswa (NIM)</label>
                <input 
                  type="text" value={nim} onChange={(e) => setNim(e.target.value)}
                  placeholder="120222XXXX"
                  className="w-full px-8 py-5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-600 outline-none transition-all font-black text-xl placeholder:text-gray-200"
                  required
                />
              </div>
              <button disabled={checkLoading} type="submit" className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-50">
                {checkLoading ? 'Processing...' : 'Verify Status'}
              </button>
            </form>
            {(result || error) && (
              <div className="mt-12 pt-12 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-500">
                {result && (
                  <div className="bg-green-50 border border-green-100 p-10 rounded-[2.5rem] text-left">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-green-600">Terpilih</span>
                    </div>
                    <h3 className="text-2xl font-black uppercase text-gray-900 mb-2 leading-none text-left">{result.name}</h3>
                    <p className="text-gray-400 text-[11px] font-black uppercase mb-8 tracking-widest text-left">Role: {result.role}</p>
                    <div className="bg-white p-6 rounded-2xl border border-green-100 text-[13px] font-bold text-gray-600 leading-relaxed text-left">
                      Selamat! Anda lolos sebagai anggota SAG Study Group. Segera konfirmasi kehadiran melalui koordinator divisi.
                    </div>
                  </div>
                )}
                {error && (
                  <div className="bg-red-50 border border-red-100 p-10 rounded-[2.5rem] text-center">
                    <div className="w-14 h-14 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 font-black text-xl text-center">!</div>
                    <h3 className="text-red-900 font-black uppercase text-base mb-2 text-center">NIM Tidak Ditemukan</h3>
                    <p className="text-red-600/70 text-[10px] font-black uppercase tracking-widest text-center">Silakan hubungi admin laboratorium.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-gradient-to-b from-white via-blue-50/50 to-blue-100/40 py-16 md:py-24 px-6 md:px-32 relative overflow-hidden border-t border-blue-100 text-left">
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
              <div className="flex items-center gap-4 text-left">
                {[
                  { label: "Instagram", url: "https://instagram.com/saglaboratory", viewBox: "0 0 24 24", svg: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /> },
                  { label: "LinkedIn", url: "https://www.linkedin.com/company/sag-laboratory/", viewBox: "0 0 512 512", svg: <path d="M150.65,100.68c0,27.99-22.69,50.68-50.68,50.68s-50.68-22.69-50.68-50.68C49.29,72.69,71.98,50,99.97,50s50.68,22.69,50.68,50.68z M150.65,191.63H49.29V462h101.36V191.63z M351.51,191.63c-22.69,0-43.03,8.08-58.82,22.13v-22.13H191.33V462h101.36V297.43c0-21.6,1.44-42.94,22.13-42.94c20.01,0,22.13,18.53,22.13,42.94V462H462V288.79C462,207.71,432.22,191.63,351.51,191.63z"/> },
                  { label: "Email", url: "mailto:sag@telkomuniversity.ac.id", viewBox: "0 0 24 24", svg: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /> }
                ].map((social, i) => (
                  <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-blue-200 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all text-black-600 p-2.5 bg-white shadow-sm text-left">
                    <svg width="100%" height="100%" viewBox={social.viewBox} fill="currentColor">{social.svg}</svg>
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-start text-left">
              <h4 className="text-sag-blue text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-40 text-left">Navigation</h4>
              <nav className="flex flex-col gap-5 text-sm font-bold tracking-widest text-left capitalize">
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
                <Link href="/study-group" className="text-blue-600">Study group</Link>
                <Link href="/research" className="text-gray-600 hover:text-blue-600 transition-colors">Research</Link>
                <Link href="/events" className="text-gray-600 hover:text-blue-600 transition-colors">Events</Link>
              </nav>
            </div>
            <div className="flex flex-col items-start text-left">
              <h4 className="text-sag-blue text-xs font-black uppercase tracking-[0.3em] mb-10 opacity-40 text-left">Contact</h4>
              <div className="mb-8 text-left">
                <p className="text-sag-blue font-black text-sm uppercase mb-3 text-left">SAG Laboratory</p>
                <p className="text-gray-500 text-sm font-medium leading-loose max-w-[300px] text-left">Jl. Telekomunikasi No.1, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40267</p>
              </div>
              <a href="mailto:sag@telkomuniversity.ac.id" className="text-black-600 font-bold text-sm border-b border-blue-600/20 hover:border-blue-600 pb-1 transition-all text-left">sag@telkomuniversity.ac.id</a>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-blue-100 flex justify-center items-center text-center">
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest text-center">© 2026 SAG Laboratory Telkom University. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}