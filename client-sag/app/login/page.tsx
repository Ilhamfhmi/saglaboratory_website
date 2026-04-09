"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LoginPage() {
  const [email, setEmail] = useState(""); // Kosongkan default agar placeholder terlihat
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    const savedEmail = localStorage.getItem("sag_admin_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json" 
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("sag_token", data.token);
        localStorage.setItem("sag_user", JSON.stringify(data.user));
        
        if (rememberMe) {
          localStorage.setItem("sag_admin_email", email);
        } else {
          localStorage.removeItem("sag_admin_email");
        }
        
        router.push("/admin/dashboard");
      } else {
        alert(data.message || "Login gagal. Cek kembali email dan password.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Tidak dapat terhubung ke server. Pastikan API Laravel sudah dijalankan.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-jakarta flex overflow-hidden">
      
      {/* ─── LEFT SIDE: LOGIN FORM ─── */}
      <div className="w-full lg:w-[42%] min-h-screen flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-white relative">
        
        <Link href="/" className="absolute top-6 left-6 lg:top-10 lg:left-10 z-20 group text-left">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-gray-500 transition-all duration-300 group-hover:bg-white group-hover:border-blue-200 group-hover:shadow-md group-hover:text-[#013599]">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm transition-transform group-hover:-translate-x-1">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Beranda</span>
          </div>
        </Link>

        <div className="w-full max-w-sm" data-aos="fade-right">
          <div className="mb-10 text-left">
            <h1 className="text-[#013599] text-4xl font-black uppercase tracking-tighter leading-none mb-3">
              Selamat Datang
            </h1>
            <p className="text-gray-400 text-sm font-medium">
              Masuk ke portal administrator SAG Laboratory.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="text-left">
              <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-50 focus:border-[#013599] outline-none transition-all font-bold text-[#013599] shadow-sm placeholder:text-gray-300 placeholder:font-medium"
                placeholder="Masukan Email"
                required
              />
            </div>

            <div className="relative text-left">
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">Password</label>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-50 focus:border-[#013599] outline-none transition-all font-bold text-[#013599] shadow-sm placeholder:text-gray-300 placeholder:font-medium"
                  placeholder="Masukan Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#013599] transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button type="button" onClick={() => setRememberMe(!rememberMe)} className="flex items-center gap-2 cursor-pointer group text-left">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${rememberMe ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300 group-hover:border-blue-400"}`}>
                  {rememberMe && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter select-none">Remember me</span>
              </button>
              <Link href="#" className="text-xs font-bold text-blue-600 uppercase tracking-tighter hover:underline text-left">Lupa Password?</Link>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-[#013599] text-white py-4.5 rounded-full font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-800 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3">
              {loading ? <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" /> : <span>Masuk</span>}
            </button>
          </form>
        </div>

        <div className="absolute bottom-8 left-6 lg:left-10 text-gray-300 text-[9px] font-black uppercase tracking-[0.3em] text-left">
            Authorized Access Only — SAG Lab © 2026
        </div>
      </div>

      {/* ─── RIGHT SIDE: GRADIENT + OVERLAY RESTORED ─── */}
      <div className="hidden lg:flex lg:w-[58%] relative flex-col justify-center overflow-hidden text-left p-12 md:p-20">
        
        {/* Base Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-[#013599] to-blue-900" />
        
        {/* Overlay Pattern (Restored with Safe Quote) */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        
        {/* Depth Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
        
        {/* Blurry Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-400/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-cyan-400/15 blur-[80px] rounded-full" />

        <div className="relative z-10 w-full max-w-4xl pt-6 text-left" data-aos="fade-left">
          
          {/* Logo Section */}
          <div className="flex items-center gap-8 mb-10 text-left">
            <div className="relative w-44 h-16 brightness-0 invert opacity-90">
              <Image src="/logo-sag.png" alt="SAG Lab" fill className="object-contain object-left" />
            </div>
            <div className="w-[1.5px] h-12 bg-white/20" />
            <div className="relative w-32 h-14 brightness-0 invert opacity-90">
              <Image src="/logo-isg2.png" alt="ISG Lab" fill className="object-contain object-left" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-white text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.95] mb-8 text-left text-balance">
            Innovating System, <br /> <span className="text-blue-300">Empowering Tomorrow.</span>
          </h2>
          
          {/* Paragraph */}
          <p className="text-blue-100/70 text-lg md:text-xl font-medium leading-relaxed mb-14 text-left max-w-3xl">
            Administrator Portal: Kelola infrastruktur data, arsitektur enterprise, dan tata kelola teknologi laboratorium secara terpadu.
          </p>
          
          {/* Stats Card - GRADIENT FIX APPLIED */}
          <div className="relative text-left max-w-3xl">
            <div className="bg-gradient-to-br from-white/15 via-white/5 to-transparent backdrop-blur-xl rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl p-12 shadow-2xl relative overflow-hidden border border-white/20 text-left">
                {/* Internal Glow Orb */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full translate-x-10 -translate-y-10 blur-2xl" />
                
                <div className="relative z-10 text-left">
                    <h4 className="text-white text-2xl font-black leading-tight mb-8 uppercase tracking-tighter">
                        System Architecture <br /> Governance Laboratory
                    </h4>
                    
                    <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20 text-left">
                        <div className="text-left">
                            <div className="text-4xl font-black text-white leading-none tracking-tighter">50+</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mt-3">Members</div>
                        </div>
                        <div className="text-left">
                            <div className="text-4xl font-black text-white leading-none tracking-tighter">12+</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mt-3">Projects</div>
                        </div>
                        <div className="text-left">
                            <div className="text-4xl font-black text-white leading-none tracking-tighter">V3.0</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mt-3">System</div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Border Accent */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
      </div>
    </div>
  );
}