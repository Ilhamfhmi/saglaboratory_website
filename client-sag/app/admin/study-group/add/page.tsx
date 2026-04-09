"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AddStudyGroup() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Enterprise Architecture", 
    description: "",
    leader: "",
    status: "Active",
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

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
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("leader", formData.leader);
    data.append("status", formData.status);
    if (selectedFile) data.append("image", selectedFile);

    try {
      const token = localStorage.getItem("sag_token");
      const response = await fetch("http://localhost:8000/api/study-groups", {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json" 
        },
        body: data,
      });

      if (response.ok) {
        alert("Gacor! Study Group SAG Berhasil Diluncurkan.");
        router.push("/admin/study-group");
      } else {
        alert("Gagal menambahkan data. Periksa kembali inputan.");
      }
    } catch (error) {
      alert("Terjadi kesalahan server.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-jakarta pt-20 pb-20 text-left">
      <div className="container mx-auto px-6 max-w-7xl">
        <Link href="/admin/study-group" className="text-gray-400 hover:text-[#013599] transition-all mb-8 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group">
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* ─── FORM AREA ─── */}
          <div className="lg:col-span-7 space-y-10" data-aos="fade-right">
            <div className="text-left">
              <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">New Study Group</h1>
              <p className="text-gray-400 text-sm font-medium">Inisiasi grup riset baru berdasarkan 3 pilar utama SAG Laboratory.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Research Pillar / Category</label>
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange} 
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-[#013599] outline-none text-[#013599]"
                >
                  <option value="Enterprise Architecture">Enterprise Architecture</option>
                  <option value="Business Process">Business Process</option>
                  <option value="IT Governance">IT Governance</option>
                </select>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Group Title</label>
                <input required name="title" value={formData.title} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-[#013599] outline-none" placeholder="E.g. TOGAF 10 Framework Analysis" />
              </div>

              <div className="grid grid-cols-2 gap-6 text-left">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Coordinator / Leader</label>
                  <input required name="leader" value={formData.leader} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-[#013599] outline-none" placeholder="Nama Ketua Grup" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Initial Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-[#013599] outline-none">
                    <option value="Active">Active</option>
                    <option value="Finished">Finished</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Research Focus / Description</label>
                <textarea required name="description" rows={5} value={formData.description} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-3xl font-medium text-gray-600 focus:ring-2 focus:ring-[#013599] outline-none" placeholder="Tujuan dan cakupan riset grup..." />
              </div>

              <div className="p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100 flex items-center justify-between text-left">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#013599]">Cover Image</label>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-gray-400 max-w-[150px] truncate">
                    {selectedFile ? selectedFile.name : "No file chosen"}
                  </span>
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()} 
                    className="px-5 py-2.5 bg-[#013599] text-white text-[10px] font-black uppercase rounded-full hover:bg-blue-800 transition-all shadow-md active:scale-95"
                  >
                    Choose File
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*" />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={submitting} 
                className={`w-full py-6 rounded-full font-black uppercase tracking-[0.2em] text-white text-[12px] transition-all shadow-xl ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#013599] hover:bg-blue-800 shadow-blue-100'}`}
              >
                {submitting ? "Launching..." : "Launch SAG Study Group"}
              </button>
            </form>
          </div>

          {/* ─── PREVIEW AREA ─── */}
          <div className="lg:col-span-5 sticky top-32 text-left" data-aos="fade-left">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 text-left">Card Live Preview</h2>
            <div className="max-w-[380px]">
              <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-2xl text-left group">
                <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
                  {preview ? <img src={preview} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /> : <div className="flex h-full items-center justify-center text-gray-300 font-bold">No Cover Selected</div>}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-[#013599] rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm">
                        {formData.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 space-y-4 text-left">
                  <h3 className="text-xl font-black text-sag-blue leading-tight uppercase tracking-tighter line-clamp-2">{formData.title || "Group Title"}</h3>
                  <div className="flex items-center gap-2 text-left">
                    {/* ICON ORANG REPLACEMENT */}
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[#013599] shadow-sm border border-blue-50">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Lead by {formData.leader || "Leader Name"}</span>
                  </div>
                  <p className="text-gray-400 text-xs font-medium line-clamp-2 leading-relaxed text-left">
                    {formData.description || "Research focus will appear here..."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}