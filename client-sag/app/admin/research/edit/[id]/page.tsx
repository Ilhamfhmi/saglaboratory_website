"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function EditResearch() {
  const router = useRouter();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Business Process",
    description: "",
    link_medium: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    
    const fetchOldData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/research/${id}?t=${Date.now()}`);
        if (!response.ok) throw new Error("Gagal mengambil data");
        const data = await response.json();
        
        setFormData({
          title: data.title || "",
          category: data.category || "Business Process",
          description: data.description || "",
          link_medium: data.link_medium || "",
        });

        // Set preview awal dari database
        setPreview(data.image_url);

      } catch (error) {
        console.error("Error:", error);
        alert("Gagal mengambil data dari database.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOldData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append("_method", "PUT"); 
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("link_medium", formData.link_medium);
    
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    try {
      const token = localStorage.getItem("sag_token");
      const response = await fetch(`http://localhost:8000/api/research/${id}`, {
        method: "POST", 
        headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" },
        body: data,
      });

      if (response.ok) {
        alert("Gacor! Research Berhasil Diperbarui!");
        router.push("/admin/research");
        router.refresh();
      } else {
        alert("Gagal update data.");
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi server.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white font-black text-blue-600 animate-pulse uppercase tracking-widest">
      Syncing Research Data...
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-jakarta pt-20 pb-20 text-left">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <Link href="/admin/research" className="text-gray-400 hover:text-blue-600 transition-all mb-8 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Cancel Edit
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT SIDE: FORM */}
          <div className="lg:col-span-7 space-y-10" data-aos="fade-right">
            <div>
              <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Edit Research</h1>
              <p className="text-gray-400 text-sm font-medium">Ubah detail dokumentasi riset SAGA Laboratory.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Research Title</label>
                <input required name="title" value={formData.title} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold transition-all" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-blue-600 outline-none">
                  <option value="Business Process">Business Process</option>
                  <option value="Enterprise Architecture">Enterprise Architecture</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Description</label>
                <textarea name="description" rows={5} value={formData.description} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-2 focus:ring-blue-600 outline-none font-medium text-gray-600" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Medium Link</label>
                <input name="link_medium" value={formData.link_medium} onChange={handleChange} placeholder="https://..." className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold outline-none" />
              </div>

              {/* ─── CUSTOM IMAGE UPLOAD (SAMA SEPERTI EVENT) ─── */}
              <div className="p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100 flex items-center justify-between transition-all">
                <label className="text-[10px] font-black uppercase tracking-widest text-blue-600">Update Cover</label>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-gray-400 italic max-w-[150px] truncate">
                    {selectedFile ? selectedFile.name : "No file chosen"}
                  </span>
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()} 
                    className="px-5 py-2.5 bg-blue-600 text-white text-[10px] font-black uppercase rounded-full hover:bg-blue-700 transition-all shadow-md active:scale-95"
                  >
                    Choose Cover
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={submitting} 
                className={`w-full py-6 rounded-full font-black uppercase tracking-[0.2em] text-white text-[12px] transition-all shadow-xl ${submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'}`}
              >
                {submitting ? "Processing..." : "Save Research Changes"}
              </button>
            </form>
          </div>

          {/* RIGHT SIDE: PREVIEW CARD */}
          <div className="lg:col-span-5 sticky top-32" data-aos="fade-left">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 text-center">Live Preview Card</h2>
            
            <div className="max-w-[380px] mx-auto">
              <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-2xl shadow-gray-200/50 group">
                
                <div className="relative h-72 w-full overflow-hidden bg-gray-100">
                  {preview ? (
                    <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300 italic font-bold text-xs uppercase text-center p-4">Current Cover Will Appear Here</div>
                  )}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">
                      {formData.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 space-y-4 text-left">
                  <h3 className="text-xl font-black text-gray-900 leading-tight uppercase tracking-tighter line-clamp-2">
                    {formData.title || "Untitled Research"}
                  </h3>
                  
                  <p className="text-gray-400 text-xs font-medium leading-relaxed line-clamp-2">
                    {formData.description || "Describe core findings of this research here..."}
                  </p>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Medium Publication</span>
                    <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-[10px] italic shadow-lg shadow-gray-200">M</div>
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