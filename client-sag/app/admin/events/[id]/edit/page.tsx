"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

// ─── Interface Data ─────────────────────────────────────────────────────────
interface EventItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  event_date: string;
  location: string;
  registration_link: string;
}

export default function AdminEditEventPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // State Form
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    event_date: "",
    location: "",
    registration_link: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    if (id) fetchEventData();
  }, [id]);

  // 1. Ambil data lama dari Laravel
  const fetchEventData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/events/${id}`);
      if (!response.ok) throw new Error("Gagal mengambil data");
      
      const data = await response.json();
      
      setFormData({
        title: data.title,
        category: data.category,
        description: data.description,
        // Format ke YYYY-MM-DD agar masuk ke input type="date"
        event_date: data.event_date ? data.event_date.split(" ")[0] : "", 
        location: data.location,
        registration_link: data.registration_link || "",
      });
      setPreviewUrl(data.image_url);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Gagal mengambil data event");
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Perubahan Input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Handle Ganti Gambar (Preview)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  // 4. Submit Update ke Laravel
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      
      /** * CRITICAL: Laravel multipart/form-data tidak bisa dibaca via PUT murni.
       * Kita gunakan method POST, tapi kita "tipu" Laravel dengan field _method PUT.
       */
      data.append("_method", "PUT"); 
      
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("event_date", formData.event_date);
      data.append("location", formData.location);
      data.append("registration_link", formData.registration_link);
      
      if (selectedFile) {
        data.append("image", selectedFile); // Nama field harus 'image' sesuai controller
      }

      const token = localStorage.getItem("sag_token");

      const response = await fetch(`http://localhost:8000/api/events/${id}`, {
        method: "POST", // WAJIB POST agar file terkirim
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Gacor! Data berhasil diupdate.");
        router.push("/admin/events"); 
        router.refresh();
      } else {
        console.error("Server Error:", result);
        alert("Gagal: " + (result.message || "Terjadi kesalahan validasi"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Gagal menyimpan data. Cek koneksi server Laravel.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-20 text-center font-black uppercase text-blue-600 animate-pulse">Syncing Data...</div>;

  return (
    <div className="min-h-screen bg-white font-jakarta pt-20 pb-20 text-left">
      <div className="container mx-auto px-6 max-w-4xl">
        
        <Link href="/admin/events" className="text-gray-400 hover:text-blue-600 transition-colors mb-6 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Cancel Edit
        </Link>

        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-12">Edit Event Detail</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Event Title</label>
                <input required name="title" value={formData.title} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold" />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold">
                  <option value="Competition">Competition</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Seminar">Seminar</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Event Date</label>
                <input required type="date" name="event_date" value={formData.event_date} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 font-bold" />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Poster Image</label>
                <div className="relative aspect-video rounded-3xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 group hover:border-blue-400 transition-colors">
                  {previewUrl && <img src={previewUrl} className="absolute inset-0 w-full h-full object-cover" alt="preview" />}
                  <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 bg-white/60 backdrop-blur-sm transition-opacity">
                    <span className="text-[10px] font-black uppercase">Change Image</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Location</label>
                <input required name="location" value={formData.location} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Description</label>
            <textarea required name="description" rows={6} value={formData.description} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-2 focus:ring-blue-600 outline-none font-medium text-gray-600" />
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Registration Link</label>
            <input name="registration_link" value={formData.registration_link} onChange={handleChange} placeholder="https://..." className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold" />
          </div>

          <button 
            type="submit" 
            disabled={submitting}
            className={`w-full py-6 rounded-full font-black uppercase tracking-[0.2em] text-white text-[11px] transition-all shadow-xl shadow-blue-100 ${submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {submitting ? "Saving..." : "Update Event Now"}
          </button>

        </form>
      </div>
    </div>
  );
}