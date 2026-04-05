"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AddResearch() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  
  // State untuk Preview & File
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // State untuk Data Form
  const [formData, setFormData] = useState({
    title: "",
    category: "Business Process",
    description: "",
    link_medium: "",
  });

  // Fungsi Handle File (Drop atau Click)
  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      // Membuat URL sementara untuk preview di browser
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Format file harus gambar (JPG/PNG)!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return alert("Tolong pilih foto cover terlebih dahulu!");
    
    setLoading(true);
    
    // Karena kirim File, kita pakai FormData, bukan JSON biasa
    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("link_medium", formData.link_medium);
    data.append("image", selectedFile);

    try {
      const token = localStorage.getItem("sag_token");
      const response = await fetch("http://localhost:8000/api/research", {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        },
        body: data,
      });

      if (response.ok) {
        alert("Research Published Successfully!");
        router.push("/admin/research");
      } else {
        const err = await response.json();
        alert(err.message || "Gagal menyimpan data.");
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20" data-aos="fade-up">
      {/* Tombol Kembali */}
      <Link href="/admin/research" className="flex items-center gap-2 text-gray-400 hover:text-sag-blue font-bold text-[10px] uppercase tracking-[0.2em] transition-all w-fit">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to List
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        {/* KOLOM KIRI: FORM INPUT (60%) */}
        <div className="lg:col-span-3 bg-white rounded-[3rem] border border-gray-100 p-10 shadow-sm">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-sag-blue uppercase tracking-tighter leading-none">New Publication</h1>
            <p className="text-gray-400 font-medium mt-2 text-sm">Tambahkan artikel atau hasil riset terbaru SAG Laboratory.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* DRAG & DROP AREA */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Cover Image</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
                className="group relative h-56 w-full border-4 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:border-sag-blue hover:bg-blue-50/30 transition-all overflow-hidden bg-gray-50/50"
              >
                {preview ? (
                  <Image src={preview} alt="Preview" fill className="object-cover" />
                ) : (
                  <div className="text-center">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-sag-blue mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <p className="text-[10px] font-black text-sag-blue uppercase tracking-widest">Drop Image or Click to Browse</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
              </div>
            </div>

            {/* Judul & Link */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Research Title</label>
                <input 
                  type="text" required placeholder="Judul Riset..."
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none font-bold text-sag-blue focus:ring-2 focus:ring-sag-blue/20 transition-all"
                  value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Category</label>
                  <select 
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none font-bold text-sag-blue focus:ring-2 focus:ring-sag-blue/20 cursor-pointer"
                    value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Business Process">Business Process</option>
                    <option value="Enterprise Architecture">Enterprise Architecture</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="IT Governance">IT Governance</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Medium Link</label>
                  <input 
                    type="url" placeholder="https://medium.com/..."
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none font-bold text-sag-blue focus:ring-2 focus:ring-sag-blue/20 transition-all"
                    value={formData.link_medium} onChange={(e) => setFormData({...formData, link_medium: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Excerpt / Description</label>
                <textarea 
                  placeholder="Berikan ringkasan singkat artikel..." rows={4} required
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none font-bold text-sag-blue focus:ring-2 focus:ring-sag-blue/20 resize-none"
                  value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full py-5 bg-sag-blue text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-xl shadow-blue-100 hover:bg-blue-800 transition-all active:scale-95"
            >
              {loading ? "Uploading Data..." : "Publish Article"}
            </button>
          </form>
        </div>

        {/* KOLOM KANAN: LIVE PREVIEW (40%) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] ml-6">Live Card Preview</h2>
          
          <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-2xl flex flex-col pointer-events-none sticky top-10">
            {/* Image Preview */}
            <div className="relative aspect-[16/10] bg-gray-100">
              {preview ? (
                <Image src={preview} alt="Preview" fill className="object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-300 gap-2">
                  <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2"/></svg>
                  <span className="font-bold text-[10px] uppercase tracking-widest italic">Waiting for image...</span>
                </div>
              )}
              <div className="absolute top-6 left-6 z-20">
                <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-sag-blue text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm">
                  {formData.category}
                </span>
              </div>
            </div>

            {/* Content Preview */}
            <div className="p-10 text-left">
              <h3 className="text-sag-blue text-2xl font-black uppercase tracking-tight mb-4 leading-tight">
                {formData.title || "Judul Artikel Anda Akan Tampil Di Sini"}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-medium line-clamp-3">
                {formData.description || "Tuliskan cuplikan artikel anda untuk melihat tampilannya di sini..."}
              </p>
              
              <div className="mt-8 pt-6 border-t border-gray-50">
                <div className="inline-flex items-center gap-3 text-sag-blue font-black uppercase tracking-widest text-[11px] opacity-30">
                  Read Full Article
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex gap-4 items-start">
             <div className="text-2xl">💡</div>
             <p className="text-[10px] text-blue-600 font-bold leading-relaxed italic">
               Preview ini mensimulasikan tampilan artikel di halaman utama. Pastikan judul tidak terlalu panjang agar tetap estetik.
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}