"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AdminEditEventPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref untuk memicu input file

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "Competition",
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

  const fetchEventData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/events/${id}`);
      if (!response.ok) throw new Error("Gagal mengambil data");
      const data = await response.json();
      
      setFormData({
        title: data.title,
        category: data.category,
        description: data.description,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  // Fungsi untuk memicu klik pada input file tersembunyi
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append("_method", "PUT"); 
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("event_date", formData.event_date);
      data.append("location", formData.location);
      data.append("registration_link", formData.registration_link);
      
      if (selectedFile) {
        data.append("image", selectedFile);
      }

      const token = localStorage.getItem("sag_token");
      const response = await fetch(`http://localhost:8000/api/events/${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
        body: data,
      });

      if (response.ok) {
        alert("Gacor! Data berhasil diupdate.");
        router.push("/admin/events"); 
        router.refresh();
      } else {
        const result = await response.json();
        alert("Gagal: " + (result.message || "Terjadi kesalahan validasi"));
      }
    } catch (err) {
      alert("Gagal menyimpan data. Cek koneksi server Laravel.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white font-black text-sag-blue animate-pulse">
      SYNCING DATA...
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-jakarta pt-20 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <Link href="/admin/events" className="text-gray-400 hover:text-blue-600 transition-all mb-8 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* ─── LEFT SIDE: FORM ────────────────────────────────────────── */}
          <div className="lg:col-span-7 space-y-10" data-aos="fade-right">
            <div>
              <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Edit Event</h1>
              <p className="text-gray-400 text-sm font-medium">Perbarui informasi agenda SAGA Laboratory.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Event Title</label>
                  <input required name="title" value={formData.title} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold">
                    <option value="Competition">Competition</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Event Date</label>
                  <input required type="date" name="event_date" value={formData.event_date} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-600 font-bold outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Location</label>
                  <input required name="location" value={formData.location} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Zoom / SAGA Lab" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Description</label>
                <textarea required name="description" rows={5} value={formData.description} onChange={handleChange} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-3xl focus:ring-2 focus:ring-blue-600 outline-none font-medium text-gray-600" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Registration Link</label>
                <input name="registration_link" value={formData.registration_link} onChange={handleChange} placeholder="https://..." className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold focus:ring-2 focus:ring-blue-600 outline-none" />
              </div>

              {/* Custom Image Upload Section */}
              <div className="p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100 flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-blue-600">Update Poster</label>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-gray-400 italic">
                    {selectedFile ? selectedFile.name : "No file chosen"}
                  </span>
                  <button 
                    type="button"
                    onClick={triggerFileInput}
                    className="px-5 py-2.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-blue-700 transition-all shadow-md active:scale-95"
                  >
                    Choose Poster
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="image/*" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className={`w-full py-6 rounded-full font-black uppercase tracking-[0.2em] text-white text-[12px] transition-all shadow-xl ${submitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100'}`}
              >
                {submitting ? "Processing..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* ─── RIGHT SIDE: PROPORTIONAL PREVIEW ────────────────────────────────── */}
          <div className="lg:col-span-5 sticky top-32" data-aos="fade-left">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6 text-center">Preview Card</h2>
            
            <div className="max-w-[380px] mx-auto">
              <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-2xl shadow-gray-200/50 group">
                
                {/* Image Section */}
                <div className="relative h-72 w-full overflow-hidden bg-gray-100">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300 italic font-bold">No Poster Selected</div>
                  )}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md text-blue-600 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">
                      {formData.category}
                    </span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-8 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-gray-900 leading-tight uppercase tracking-tighter line-clamp-1">
                      {formData.title || "Untitled Event"}
                    </h3>
                    
                    <div className="flex items-center flex-wrap gap-3 text-gray-400 text-[9px] font-bold uppercase tracking-widest">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        {formData.event_date ? new Date(formData.event_date).toLocaleDateString('id-ID', {day: 'numeric', month: 'short'}) : "TBD"}
                      </div>
                      <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                      <div className="flex items-center gap-1.5 line-clamp-1 max-w-[150px]">
                        <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                        {formData.location || "TBD"}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-xs font-medium leading-relaxed line-clamp-2">
                    {formData.description || "Describe your event detail here..."}
                  </p>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white" />
                      ))}
                    </div>
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-100">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center bg-gray-50 py-4 rounded-2xl border border-dashed border-gray-200">
               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                  Design Preview Mode Active
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}