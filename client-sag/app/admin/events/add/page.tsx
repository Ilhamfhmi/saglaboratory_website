"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AddEventPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Workshop",
    event_date: "",
    location: "",
    registration_link: "",
    description: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("event_date", formData.event_date);
    data.append("location", formData.location);
    data.append("registration_link", formData.registration_link);
    data.append("description", formData.description);
    
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    try {
      const token = localStorage.getItem("sag_token");
      const response = await fetch("http://localhost:8000/api/events", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
        body: data,
      });

      if (response.ok) {
        alert("Event Berhasil Dipublikasikan!");
        router.push("/admin/events");
      } else {
        alert("Gagal menyimpan event. Cek kembali inputan Anda.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan koneksi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 pb-20">
      {/* Navigation */}
      <Link href="/admin/events" className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 mb-10 hover:text-sag-blue transition-colors">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
        Back to Events List
      </Link>

      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* ─── LEFT: FORM INPUT (60%) ─── */}
        <div className="w-full lg:w-[60%] space-y-10" data-aos="fade-right">
          <div className="text-left">
            <h1 className="text-4xl font-black text-sag-blue uppercase tracking-tighter">Add Event</h1>
            <p className="text-gray-400 font-medium text-sm mt-2">Publish kegiatan terbaru SAG Laboratory ke website utama.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-2 block">Event Title</label>
                <input 
                  type="text" placeholder="Masukkan judul acara..." required
                  className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none font-bold text-sag-blue focus:ring-2 focus:ring-sag-blue/10"
                  value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-2 block">Category</label>
                <select 
                  className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none font-bold text-sag-blue appearance-none cursor-pointer"
                  value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Webinar">Webinar</option>
                  <option value="Competition">Competition</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Internal Meeting">Internal Meeting</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-2 block">Event Date</label>
                <input 
                  type="date" required
                  className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none font-bold text-sag-blue"
                  value={formData.event_date} onChange={(e) => setFormData({...formData, event_date: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-2 block">Location</label>
                <input 
                  type="text" placeholder="Gedung TASS / Zoom" required
                  className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none font-bold text-sag-blue"
                  value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-2 block">Registration Link</label>
                <input 
                  type="url" placeholder="https://bit.ly/..."
                  className="w-full px-8 py-5 rounded-2xl bg-gray-50 border-none font-bold text-sag-blue"
                  value={formData.registration_link} onChange={(e) => setFormData({...formData, registration_link: e.target.value})}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-2 block">Poster Image</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-40 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-all group"
                >
                  <svg className="w-6 h-6 text-gray-300 group-hover:text-sag-blue mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="text-[10px] font-black uppercase text-gray-400 group-hover:text-sag-blue">Click to upload poster</span>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" required onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setSelectedFile(e.target.files[0]);
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }
                  }} />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-2 block">Description</label>
                <textarea 
                  placeholder="Detail lengkap acara..." rows={8} required
                  className="w-full px-8 py-6 rounded-[2rem] bg-gray-50 border-none font-bold text-sag-blue resize-none"
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full py-6 bg-sag-blue text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-800 transition-all shadow-2xl"
            >
              {loading ? "Publishing..." : "Add Event Now"}
            </button>
          </form>
        </div>

        {/* ─── RIGHT: LIVE PREVIEW (40%) ─── */}
        <div className="w-full lg:w-[40%] text-left" data-aos="fade-left">
          <div className="sticky top-32">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-2 block mb-6 bg-blue-50 w-fit px-4 py-2 rounded-full border border-blue-100">Live Preview</span>
            
            {/* Real Card Preview */}
            <div className="bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl transition-all duration-500 hover:border-blue-400 group">
              <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                <div className="absolute inset-0 bg-sag-blue/5 group-hover:bg-transparent transition-colors z-10" />
                {preview ? (
                  <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold uppercase text-[10px]">No Poster Uploaded</div>
                )}
                <div className="absolute top-6 left-6 z-20">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-sag-blue text-[9px] font-black uppercase tracking-widest rounded-xl shadow-sm">
                    {formData.category}
                  </span>
                </div>
              </div>

              <div className="p-10 flex flex-col">
                <h3 className="text-sag-blue text-2xl font-black uppercase tracking-tight leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                  {formData.title || "Headline Kegiatan"}
                </h3>
                
                <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2"/></svg>
                    {formData.event_date || "Date"}
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2"/></svg>
                    {formData.location || "Location"}
                  </div>
                </div>

                <p className="text-gray-500 text-xs leading-relaxed font-medium mt-6 line-clamp-3 opacity-80">
                  {formData.description || "Tulis deskripsi acara di form kiri untuk melihat preview teks di sini secara otomatis..."}
                </p>

                <div className="mt-8 pt-6 border-t border-gray-50">
                  <div className="inline-flex items-center gap-3 text-sag-blue font-black uppercase tracking-widest text-[10px] opacity-40">
                    Read Details
                    <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}