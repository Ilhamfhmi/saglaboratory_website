"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@sag.com");
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

    setTimeout(() => {
      setLoading(false);
      if (email === "admin@sag.com" && password === "admin123") {
        if (rememberMe) {
          localStorage.setItem("sag_admin_email", email);
        } else {
          localStorage.removeItem("sag_admin_email");
        }
        router.push("/admin/dashboard");
      } else {
        alert("Kredensial salah. Akses ditolak.");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white font-jakarta flex overflow-hidden">

      {/* ── LEFT SIDE: LOGIN FORM ── */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 md:p-12 lg:p-20 bg-white relative">

        {/* Back Button */}
        <Link
          href="/"
          className="group absolute top-10 left-10 flex items-center gap-2 text-gray-400 hover:text-sag-blue transition-all duration-300"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className="text-xs font-bold uppercase tracking-widest">Beranda</span>
        </Link>

        <div className="w-full max-w-sm" data-aos="fade-right">
          <div className="mb-10">
            <h1 className="text-sag-blue text-4xl font-black uppercase tracking-tighter leading-none mb-3">
              Selamat Datang
            </h1>
            <p className="text-gray-400 text-sm font-medium">
              Masuk ke portal administrator SAG Laboratory.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">
                Email Administrator
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-50 focus:border-sag-blue outline-none transition-all font-bold text-sag-blue shadow-sm"
                placeholder="admin@sag.com"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                  Security Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-50 focus:border-sag-blue outline-none transition-all font-bold text-sag-blue shadow-sm"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sag-blue transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Lupa Password */}
            <div className="flex items-center justify-between">
              {/* Checkbox Remember Me — menggunakan state langsung, bukan peer CSS */}
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    rememberMe
                      ? "bg-blue-600 border-blue-600"
                      : "bg-white border-gray-300 group-hover:border-blue-400"
                  }`}
                >
                  {rememberMe && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={3.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter select-none">
                  Remember me
                </span>
              </button>

              <Link
                href="#"
                className="text-xs font-bold text-blue-600 uppercase tracking-tighter hover:underline"
              >
                Lupa Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sag-blue text-white py-4.5 rounded-full font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-800 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <span>Masuk</span>
              )}
            </button>
          </form>

          <div className="absolute bottom-8 left-10 text-gray-300 text-[9px] font-black uppercase tracking-[0.3em]" />
        </div>
      </div>

      {/* ── RIGHT SIDE: VISUAL & BRANDING ── */}
      <div className="hidden lg:flex lg:w-[55%] bg-gradient-to-br from-sag-blue via-[#1e40af] to-[#1e3a8a] relative p-16 flex-col justify-center overflow-hidden">

        {/* Glow Effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-blue-400/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-cyan-400/10 blur-[100px] rounded-full" />

        <div className="relative z-10 max-w-xl" data-aos="fade-left">

          {/* Logo SAG — mt-8 untuk posisi logo lebih ke bawah */}
          <div className="relative w-44 h-16 mb-12 mt-8 brightness-0 invert opacity-90 drop-shadow-xl">
            <Image
              src="/logo-sag.png"
              alt="SAG Lab"
              fill
              className="object-contain object-left"
            />
          </div>

          <h2 className="text-white text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
            Innovating System, <br />
            <span className="text-blue-400">Empowering Tomorrow.</span>
          </h2>

          <p className="text-blue-100/70 text-lg font-medium leading-relaxed mb-16">
            Administrator Portal: Kelola infrastruktur data, arsitektur enterprise, dan tata kelola
            teknologi laboratorium secara terpadu.
          </p>

          {/* Curved Stats Box */}
          <div className="relative">
            <div className="bg-white/95 backdrop-blur-sm rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-2xl rounded-bl-2xl p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-700" />

              <div className="relative z-10">
                <h4 className="text-sag-blue text-2xl font-black leading-tight mb-4 uppercase tracking-tighter">
                  Laboratory Management <br /> & Digital Governance
                </h4>

                <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-2xl font-black text-sag-blue leading-none">50+</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">Members</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-sag-blue leading-none">12+</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-sag-blue leading-none">V3.0</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-2">System</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shimmer Border Line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />
      </div>

    </div>
  );
}