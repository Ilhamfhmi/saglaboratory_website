"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditResearch() {
  const router = useRouter();
  const { id } = useParams(); // Ambil ID dari URL
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    link_medium: "",
  });

  // 1. Ambil data lama saat halaman dibuka
  useEffect(() => {
    const fetchOldData = async () => {
      const response = await fetch(`http://localhost:8000/api/research/${id}`);
      const data = await response.json();
      setFormData({
        title: data.title,
        category: data.category,
        description: data.description,
        link_medium: data.link_medium || "",
      });
      setPreview(data.image_url);
    };
    fetchOldData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("link_medium", formData.link_medium);
    
    // Hanya kirim image kalau user pilih file baru
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    try {
      const token = localStorage.getItem("sag_token");
      const response = await fetch(`http://localhost:8000/api/research/${id}`, {
        method: "POST", // Kita pakai POST + _method=PUT (standar Laravel untuk upload file)
        headers: { "Authorization": `Bearer ${token}` },
        body: data,
      });

      if (response.ok) {
        alert("Update Berhasil!");
        router.push("/admin/research");
      }
    } catch (error) {
      alert("Gagal update data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white rounded-[3rem] shadow-sm border border-gray-100">
      <h1 className="text-2xl font-black text-sag-blue mb-8 uppercase tracking-tighter">Edit Research</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Preview & Upload Area */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative h-48 w-full bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
        >
          {preview ? (
            <img src={preview} className="w-full h-full object-cover" alt="preview" />
          ) : (
            <span className="text-gray-400 font-bold text-xs uppercase">Click to Change Cover</span>
          )}
          <input 
            type="file" ref={fileInputRef} hidden 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setSelectedFile(file);
                setPreview(URL.createObjectURL(file));
              }
            }} 
          />
        </div>

        <input 
          className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold text-sag-blue"
          value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
          placeholder="Judul..."
        />

        <select 
          className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold text-sag-blue"
          value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
        >
          <option value="Business Process">Business Process</option>
          <option value="Enterprise Architecture">Enterprise Architecture</option>
          <option value="UI/UX Design">UI/UX Design</option>
        </select>

        <textarea 
          rows={5} className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold text-sag-blue resize-none"
          value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
        />

        <button 
          type="submit" disabled={loading}
          className="w-full py-4 bg-sag-blue text-white rounded-2xl font-black uppercase tracking-widest hover:bg-blue-800 transition-all"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}